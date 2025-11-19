import { auth, clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const clerk = await clerkClient();
    const user = await clerk.users.getUser(userId);
    const email = user.emailAddresses[0]?.emailAddress;

    return NextResponse.json({
      userId: user.id,
      email: email,
      publicMetadata: user.publicMetadata,
      privateMetadata: user.privateMetadata,
      isAdmin: email?.toLowerCase() === 'codemurf0@gmail.com',
      expectedRole: email?.toLowerCase() === 'codemurf0@gmail.com' ? 'admin' : (user.publicMetadata?.role || 'user')
    });
  } catch (error) {
    console.error('Error fetching user role:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
