import { auth, clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user is admin
    const clerk = await clerkClient();
    const currentUser = await clerk.users.getUser(userId);
    const email = currentUser.emailAddresses[0]?.emailAddress;

    if (email?.toLowerCase() !== 'codemurf0@gmail.com') {
      return NextResponse.json({ error: 'Forbidden - Admin access required' }, { status: 403 });
    }

    // Get query parameters
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get('limit') || '100');
    const offset = parseInt(searchParams.get('offset') || '0');
    const search = searchParams.get('search') || '';
    const role = searchParams.get('role') || '';

    // Fetch all users from Clerk
    const usersResponse = await clerk.users.getUserList({
      limit: limit,
      offset: offset,
    });

    // Transform Clerk users to our format
    const users = usersResponse.data.map(user => {
      const email = user.emailAddresses[0]?.emailAddress || '';
      const isAdmin = email.toLowerCase() === 'codemurf0@gmail.com';
      
      return {
        id: user.id,
        name: user.fullName || user.firstName || user.username || email.split('@')[0] || 'User',
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: email,
        role: isAdmin ? 'admin' : (user.publicMetadata?.role as string || 'user'),
        status: user.banned ? 'banned' : (user.locked ? 'locked' : 'active'),
        avatar: user.imageUrl || '',
        created_at: new Date(user.createdAt).toISOString(),
        last_sign_in: user.lastSignInAt ? new Date(user.lastSignInAt).toISOString() : null,
        metadata: user.publicMetadata
      };
    });

    // Apply filters
    let filteredUsers = users;
    
    if (search) {
      const searchLower = search.toLowerCase();
      filteredUsers = filteredUsers.filter(user => 
        user.name.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower)
      );
    }

    if (role && role !== 'all') {
      filteredUsers = filteredUsers.filter(user => user.role === role);
    }

    return NextResponse.json({
      users: filteredUsers,
      total: usersResponse.totalCount,
      hasMore: (offset + limit) < usersResponse.totalCount
    });

  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' }, 
      { status: 500 }
    );
  }
}
