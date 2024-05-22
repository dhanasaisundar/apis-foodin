var jwt = require("jsonwebtoken");

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/* ############################################################################### */
function validatePassword(password) {
  const lengthRegex = /.{8,}/;
  const capitalLetterRegex = /[A-Z]/;
  const numberRegex = /[0-9]/;
  const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

  // Check if the password meets all requirements
  return (
    lengthRegex.test(password) &&
    capitalLetterRegex.test(password) &&
    numberRegex.test(password) &&
    specialCharRegex.test(password)
  );
}

/* ############################################################################### */
function validateLogin(req, res, next) {
  const { email, password } = req.body;

  // Checking email and password are present
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  // Additional validation logic (e.g., email format validation)
  const isEmailValid = validateEmail(email);
  const isPasswordValid = validatePassword(password);
  if (!isEmailValid || !isPasswordValid) {
    return res.status(400).json({ error: "Invalid Email or Password" });
  }

  // If validation succeeds, proceed to the next middleware
  next();
}

/* ############################################################################### */
function authentication(req, res, next) {
  let jwtToken;
  const authHeader = req.headers.authorization;
  if (authHeader !== undefined) {
    jwtToken = authHeader.split(" ")[1];
  }

  if (!jwtToken) {
    return res.status(401).send("Invalid Token");
  }

  jwt.verify(jwtToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send("Invalid Token");
    }
    next();
  });
}

/* ############################################################################### */
module.exports = {
  validateEmail,
  validatePassword,
  validateLogin,
  authentication,
};
