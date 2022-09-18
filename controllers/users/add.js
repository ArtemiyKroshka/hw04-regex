import User from "../../models/user.js";

const add = async (req, res) => {
    const result = await User.create(req.body);
    res.status(201).json(result)
}

export default add;