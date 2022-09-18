import User from "../../models/user.js";

import { createError } from "../../helpers/index.js";

const updateById = async (req, res) => {
    const { id, field } = req.params;
    if (field && (req.body[field] === undefined || !User.schema.paths[field])) {
        throw createError(400, `Missing field ${field}`);
    }
    const result = await User.findByIdAndUpdate(id, req.body, {new: true, runValidators: true});
    if (!result) {
        throw createError(404, "Not found");
    }
    res.json(result);
}

export default updateById;