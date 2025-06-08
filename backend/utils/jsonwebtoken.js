import jwt from "jsonwebtoken";

// Function to generate a JWT token and set it as an HTTP-only cookie
export const JWTToken = (userId, res) => {
  // Create a signed JWT with the user's ID as payload
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d", // Token expires in 7 days
  });

  // Set the token as a cookie in the response
  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie expires in 7 days (in ms)
    httpOnly: true, // Prevents client-side JS from accessing the cookie
    sameSite: "None", // Allows cross-site cookie usage
    secure: true, // Ensures cookie is sent only over HTTPS
  });

  return token; // Return the generated token
};
