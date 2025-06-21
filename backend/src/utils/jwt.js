import jwt from "jsonwebtoken";
//The function requires a user having following properties:
// - firebaseUID
// - email
// - name

const generateJWT = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );
};

const verifyJWT = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};

export { generateJWT, verifyJWT };
