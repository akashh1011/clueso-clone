import Guide from "../models/Guide.js"; // .js lagana mat bhulna

export const createGuide = async (req, res) => {
  try {
    const { title, steps } = req.body;

    const processedSteps = steps.map((step, index) => ({
      ...step,
      order: index + 1,
      description:
        step.description || `Click on "${step.elementText || step.elementTag}"`,
    }));

    const guide = new Guide({
      title: title || "New Recorded Guide",
      steps: processedSteps,
    });

    const createdGuide = await guide.save();
    res.status(201).json(createdGuide);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getGuides = async (req, res) => {
  try {
    const guides = await Guide.find().sort({ createdAt: -1 });
    res.json(guides);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getGuideById = async (req, res) => {
  try {
    const guide = await Guide.findById(req.params.id);
    if (guide) {
      res.json(guide);
    } else {
      res.status(404).json({ message: "Guide not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
