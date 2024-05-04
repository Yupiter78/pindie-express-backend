const sendAllCategories = (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(req.categoriesArray));
};

const sendCategoryCreated = (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(req.category));
};

const sendCategoryById = (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(req.category));
};

const sendCategoryUpdated = (req, res) => {
    res.json({ message: "Категория обновлена" });
};

const sendCategoryDeleted = (req, res) => {
    res.json(req.category);
};

module.exports = {
    sendAllCategories,
    sendCategoryCreated,
    sendCategoryById,
    sendCategoryUpdated,
    sendCategoryDeleted
};
