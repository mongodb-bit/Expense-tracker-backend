import bcrypt from 'bcrypt';
import pool from '../db/pool.js';
import { createJWT }  from '../db/index.js';
// Sign up
export const signUp = async (req, res) => {
  const { email, password, firstName } = req.body;

  try {
    const userExists = await pool.query(
      'SELECT * FROM tbluser WHERE email = $1',
      [email]
    );

    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      'INSERT INTO tbluser (firstname, password, email) VALUES ($1, $2, $3)',
      [firstName, hashedPassword, email]
    );

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Database error' });
  }
};

// Sign in
export const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      'SELECT * FROM tbluser WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
     const token=createJWT(user.id)

      res
      .status(200)
      .json({
        status:"success",
        message: "login succesfully",
        user,
        token,
      })
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Database error' });
  }
};
