import { auth, currentUser } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"

// Get JWT secret from environment variables
const JWT_SECRET = process.env.JWT_SECRET

if (!JWT_SECRET) {
	console.error("⚠️ JWT_SECRET is not configured in environment variables!")
}

export async function GET() {
	try {
		// Verify user is authenticated with Clerk
		const { userId } = await auth()
		if (!userId) {
			return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
		}

		// Get user details
		const user = await currentUser()
		if (!user) {
			return NextResponse.json({ error: "User not found" }, { status: 404 })
		}

		// Create JWT payload matching VS Code extension's expected format
		// Extension expects: { r: { u: userId, o?: orgId, t: 'auth' }, iss, sub, iat, exp, v }
		const payload = {
			iss: "codemurf", // Issuer
			sub: user.id, // Subject - User ID
			v: 1, // Version
			r: {
				u: user.id, // User ID (required by extension)
				t: "auth", // Token type: auth token
				// o: undefined  // Organization ID (optional)
			},
			// Additional user info for extension use
			email: user.emailAddresses[0]?.emailAddress || "",
			firstName: user.firstName || "",
			lastName: user.lastName || "",
			imageUrl: user.imageUrl || "",
			iat: Math.floor(Date.now() / 1000),
			exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7), // 7 days expiry
		}

		// Generate JWT token
		const token = jwt.sign(payload, JWT_SECRET)

		// Create deep link to VS Code extension
		// Format: vscode://publisher.extensionName/path?token=<JWT>
		const deepLink = `vscode://codemurf.codemurf/auth?token=${encodeURIComponent(token)}`

		console.log("✅ Extension auth token generated for user:", user.emailAddresses[0]?.emailAddress)

		return NextResponse.json({ 
			success: true, 
			deepLink,
			message: "Authentication token generated successfully"
		})

	} catch (error) {
		console.error("❌ Extension auth error:", error)
		return NextResponse.json(
			{ 
				error: error instanceof Error ? error.message : "Internal server error",
				details: "Failed to generate authentication token"
			},
			{ status: 500 }
		)
	}
}
