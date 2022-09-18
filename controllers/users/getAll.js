import User from "../../models/user.js";

const getAll = async (req, res) => {
    const result = await User.find({});
    res.json(result);
}

export default getAll;