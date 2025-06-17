import pool from '../db/pool.js';





export const getAccounts = async (req, res) => {
  try {
       const { userId } = req.body.user;
      const accounts = await pool.query({
      text:'SELECT * FROM tblaccount WHERE user_id = $1',
       values:[userId],
    });
    
    res.status(200).json({
      status: 'success',
      data: accounts.rows
      });

    // your logic here
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "failed", message: error.message });
  }
};



export const createAccount = async (req, res) => {
  try {

    const { userId } = req.body.user;
    const {name ,amount ,account_number }= req.body;

    const accountExistsResult=await pool.query({
        text:'SELECT * FROM tblaccount WHERE account_name=$1 AND user_id=$2',
        values:[name,userId],
    })

     const  accountExists =false;
     if (accountExistsResult.rows>0) {
         accountExists=true;
     }
     
     if (accountExists) {
         return res
                .status(409)
                .json({status : "failed", message : " ACCOUNT ALREADY CREATED"});
            
      }

      const createAccountResult = await pool.query({
      text: `
        INSERT INTO tblaccount (user_id, account_name, account_number, account_balance)
        VALUES ($1, $2, $3, $4)
        RETURNING *
      `,
      values: [userId, name, account_number, amount],
    })

    const account =createAccountResult.rows[0];
    const userAccounts = Array.isArray(name) ? name : [name];

    const updateUserAccountQuery = {
     text: `UPDATE tbluser 
         SET accounts = array_cat(accounts, $1), 
             updatedat = CURRENT_TIMESTAMP 
         WHERE id = $2 
         RETURNING *`,
         values: [userAccounts, userId],
    };

    await pool.query(updateUserAccountQuery);

      const description =account.account_name + "(Inital Deposit";

     const initialDepositQuery = {
        text: `INSERT INTO tbltransaction(user_id, description, type, status, amount, source) 
         VALUES($1, $2, $3, $4, $5, $6) 
          RETURNING *`,
       values: [
         userId,
         description,
         "income",
         "Completed",
         amount,
         account.account_name,
        ],
   }; 

   await pool.query(initialDepositQuery);
   res.status(201).json({
    status:"sucess",
    message: account.account_name + "ACCOUNT CREATED SUCCESFULLY",
    data: account
   })
       
    // your logic here
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "failed", message: error.message });
  }
};
 
 


export const addMoneyToAccount = async (req, res) => {
  try {
    const { userId } = req.body.user;
    const { id } = req.params;
    const { amount } = req.body;

    const newAmount = Number(amount);

    const result = await pool.query({
      text: `UPDATE tblaccount 
             SET account_balance = account_balance + $1, 
                 updatedat = CURRENT_TIMESTAMP 
             WHERE id = $2 
             RETURNING *`,
      values: [newAmount, id],
    });

    const accountInformation = result.rows[0];

    const description = accountInformation.account_name + " (Deposit)";

    const transQuery = {
      text: `INSERT INTO tbltransaction(user_id, description, type, status, amount, source) 
             VALUES($1, $2, $3, $4, $5, $6) 
             RETURNING *`,
      values: [
        userId,
        description,
        "income",
        "Completed",
        amount,
        accountInformation.account_name,
      ],
    };

    const transactionResult = await pool.query(transQuery);

    res.status(200).json({
      status: "success",
      message: "Money added and transaction recorded.",
      data: {
        account: accountInformation,
        transaction: transactionResult.rows[0],
      },
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "failed", message: error.message });
  }
};

