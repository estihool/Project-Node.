import Link from "../Models/Link.js";

const LinkController = {
redirectLink: async (req, res) => {
  try {
    const id = req.params.id;
    const ipAddress = req.ip; // ניתן לקבל את כתובת ה-IP מהבקשה
    const targetParamValue = req.query.t || "";

    const myLink = await Link.findById(id);
    if (!myLink) {
      return res.status(404).json({ message: "Link not found" });
    }

    myLink.clicks.push({ ipAddress, targetParamValue });
    await myLink.save();

    res.redirect(myLink.originalUrl);

  } catch (e) {
    res.status(400).json({ message: e.message });
  }
},

getSegmentedClicks: async (req, res) => {
  try {
    const link = await Link.findById(req.params.id);
    if (!link) return res.status(404).send('Link not found');

    const segmentedClicks = link.clicks.reduce((acc, click) => {
      const targetValue = click.targetParamValue;
      if (!acc[targetValue]) {
        acc[targetValue] = 0;
      }
      acc[targetValue]++;
      return acc;
    }, {});

    res.json(segmentedClicks);
  } catch (error) {
    res.status(500).send(error.message);
  }
},
  getAll: async (req, res) => {
    try {
      const links = await Link.find();
      res.json({ links});
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  getById: async (req, res) => {
    try {
      const link = await Link.findById(req.params.id);//שליפה לפי מזהה
      res.json(link);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  addLink: async (req, res) => {
    const { originalUrl, clicks } = req.body;
    try {
      const nweLink = await Link.create({ originalUrl, clicks });//הוספת חדש
      res.json(nweLink);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  updateLink: async (req, res) => {
    const { id } = req.params;
    try {
      const updatedLink = await Link.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.json(updatedLink);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  deleteLink : async (req, res) => {
    const { id } = req.params;
    try {
      const deleted = await Link.findByIdAndDelete(id);
      res.json(deleted);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

};

export default LinkController;
