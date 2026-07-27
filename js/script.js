"use strict";

(() => {
  const STORAGE_KEYS = {
    formState: "hypeSquadChibi.formState",
    locks: "hypeSquadChibi.locks",
    activeTab: "hypeSquadChibi.activeTab",
    history: "hypeSquadChibi.history",
  };

  const CATEGORY_KEYS = [
    "characterSetup",
    "characterAppearance",
    "hairGrooming",
    "fashionFootwear",
    "accessoriesGear",
    "themeActivity",
    "colorMood",
    "poseExpression",
    "sceneBackground",
    "compositionLighting",
    "customTypography",
    "renderingFormat",
    "negativeInstructions",
  ];

  const CATEGORY_TABS = {
    characterSetup: "character",
    characterAppearance: "appearance",
    hairGrooming: "appearance",
    fashionFootwear: "fashion",
    accessoriesGear: "fashion",
    themeActivity: "theme",
    colorMood: "theme",
    poseExpression: "scene",
    sceneBackground: "scene",
    compositionLighting: "scene",
    customTypography: "text",
    renderingFormat: "finish",
    negativeInstructions: "finish",
  };

  const CONTROL_CATEGORY = {
    characterCount: "characterSetup",
    characterConfiguration: "characterSetup",
    groupFormat: "characterSetup",
    groupRelationship: "characterSetup",

    skinTone: "characterAppearance",
    bodyType: "characterAppearance",
    facialFeatures: "characterAppearance",
    eyeStyle: "characterAppearance",

    hairStyle: "hairGrooming",
    hairColor: "hairGrooming",
    groomingStyle: "hairGrooming",

    outfitStyle: "fashionFootwear",
    outfitDetails: "fashionFootwear",
    footwear: "fashionFootwear",

    jewelry: "accessoriesGear",
    accessories: "accessoriesGear",
    sportsGear: "accessoriesGear",

    mainTheme: "themeActivity",
    activity: "themeActivity",

    colorPalette: "colorMood",
    mood: "colorMood",

    pose: "poseExpression",
    expression: "poseExpression",

    background: "sceneBackground",
    backgroundDetails: "sceneBackground",

    composition: "compositionLighting",
    cameraAngle: "compositionLighting",
    lighting: "compositionLighting",

    customName: "customTypography",
    jerseyNumber: "customTypography",
    mainSlogan: "customTypography",
    supportingWords: "customTypography",
    typographyStyle: "customTypography",
    textPlacement: "customTypography",

    chibiFinish: "renderingFormat",
    detailLevel: "renderingFormat",
    orientation: "renderingFormat",
    surfaceFinish: "renderingFormat",

    negativeInstructions: "negativeInstructions",
  };

  const PROTECTED_TEXT_KEYS = [
    "customName",
    "jerseyNumber",
    "mainSlogan",
    "supportingWords",
  ];

  const NON_RANDOMIZABLE_KEYS = [
    ...PROTECTED_TEXT_KEYS,
    "typographyStyle",
    "textPlacement",
    "negativeInstructions",
  ];

  const REQUIRED_KEYS = [
    "characterCount",
    "characterConfiguration",
    "groupFormat",
    "skinTone",
    "bodyType",
    "eyeStyle",
    "hairStyle",
    "hairColor",
    "groomingStyle",
    "outfitStyle",
    "footwear",
    "mainTheme",
    "activity",
    "colorPalette",
    "mood",
    "pose",
    "expression",
    "background",
    "composition",
    "cameraAngle",
    "lighting",
    "chibiFinish",
    "detailLevel",
    "orientation",
    "surfaceFinish",
  ];

  const DEFAULTS = {
    characterCount: "One",
    characterConfiguration: "Female",
    groupFormat: "Solo",
    groupRelationship: "None",

    skinTone: "Deep brown",
    bodyType: "Curvy",
    facialFeatures: ["Full glossy lips"],
    eyeStyle: "Oversized expressive eyes",

    hairStyle: "Long body waves",
    hairColor: ["Black"],
    groomingStyle: "Polished glam",

    outfitStyle: "Luxury sportswear",
    outfitDetails: ["Jersey top"],
    footwear: "Statement sneakers",

    jewelry: ["Gold chain"],
    accessories: ["None"],
    sportsGear: ["None"],

    mainTheme: "Basketball",
    activity: "Confident courtside pose",

    colorPalette: ["Royal blue and gold"],
    mood: "Bold and confident",

    pose: "Power stance",
    expression: "Confident smile",

    background: "Stylized sports arena",
    backgroundDetails: ["Dramatic floor graphics"],

    composition: "Full-body poster composition",
    cameraAngle: "Eye level",
    lighting: "Glossy studio lighting",

    customName: "",
    jerseyNumber: "",
    mainSlogan: "",
    supportingWords: "",
    typographyStyle: "Bold sports lettering",
    textPlacement: "Integrated poster layout",

    chibiFinish: "High-gloss exaggerated chibi",
    detailLevel: "Highly detailed",
    orientation: "Portrait 4:5",
    surfaceFinish: ["Glossy skin finish"],

    negativeInstructions: ["No minors"],
  };

  const RANDOM_LIMITS = {
    facialFeatures: [1, 4],
    hairColor: [1, 2],
    outfitDetails: [1, 4],
    jewelry: [0, 3],
    accessories: [0, 4],
    sportsGear: [0, 3],
    colorPalette: [1, 3],
    backgroundDetails: [0, 3],
    surfaceFinish: [1, 3],
  };

  const THEME_GEAR_MAP = {
    Basketball: ["Basketball"],
    Football: ["Football"],
    Soccer: ["Soccer ball"],
    Baseball: ["Baseball and glove"],
    Softball: ["Softball and glove"],
    Tennis: ["Tennis racket and ball"],
    Volleyball: ["Volleyball"],
    Boxing: ["Boxing gloves"],
    Golf: ["Golf club and ball"],
    Hockey: ["Hockey stick and puck"],
    "Track and field": ["Track baton"],
    Cheerleading: ["Cheer pom-poms"],
    Wrestling: ["Wrestling gear"],
    Skateboarding: ["Skateboard"],
    "Roller skating": ["Roller skates"],
    Fitness: ["Fitness weights"],
  };

  const PRESETS = {
    "preset-court-queen": {
      label: "Court Queen",
      purpose: "Glamorous solo female basketball character.",
      values: {
        characterCount: "One",
        characterConfiguration: "Female",
        groupFormat: "Solo",
        groupRelationship: "None",
        bodyType: "Curvy",
        hairStyle: "Long body waves",
        hairColor: ["Black"],
        groomingStyle: "Polished glam",
        outfitStyle: "Luxury sportswear",
        outfitDetails: ["Jersey dress"],
        footwear: "Statement sneakers",
        jewelry: ["Gold chain"],
        accessories: ["None"],
        sportsGear: ["Basketball"],
        mainTheme: "Basketball",
        activity: "Confident courtside pose",
        colorPalette: ["Royal blue and gold"],
        mood: "Bold and confident",
        pose: "Power stance",
        expression: "Confident smile",
        background: "Basketball court",
        composition: "Full-body poster composition",
        cameraAngle: "Slight low angle",
        lighting: "Arena spotlight",
        chibiFinish: "Premium 3D glossy chibi",
        orientation: "Portrait 4:5",
      },
    },

    "preset-court-king": {
      label: "Court King",
      purpose: "Confident male basketball character.",
      values: {
        characterCount: "One",
        characterConfiguration: "Male",
        groupFormat: "Solo",
        groupRelationship: "None",
        bodyType: "Athletic",
        hairStyle: "Low fade",
        hairColor: ["Soft black"],
        groomingStyle: "Clean-cut masculine",
        outfitStyle: "Custom jersey outfit",
        outfitDetails: ["Basketball shorts"],
        footwear: "Basketball shoes",
        jewelry: ["Diamond chain"],
        accessories: ["None"],
        sportsGear: ["Basketball"],
        mainTheme: "Basketball",
        activity: "Victory celebration",
        colorPalette: ["Black and gold"],
        mood: "Powerful and commanding",
        pose: "Victory pose",
        expression: "Fierce game face",
        background: "Stylized sports arena",
        composition: "Trading-card composition",
        cameraAngle: "Dramatic low angle",
        lighting: "Arena spotlight",
        chibiFinish: "Collectible figurine chibi",
        orientation: "Portrait 4:5",
      },
    },

    "preset-power-couple": {
      label: "Game Day Power Couple",
      purpose: "Coordinated sports couple.",
      values: {
        characterCount: "Two",
        characterConfiguration: "Mixed-gender group",
        groupFormat: "Couple",
        groupRelationship: "Romantic couple",
        bodyType: "Mixed body types",
        groomingStyle: "Mixed coordinated grooming",
        outfitStyle: "Coordinated couple outfits",
        footwear: "Statement sneakers",
        jewelry: ["Coordinated jewelry"],
        accessories: ["None"],
        sportsGear: ["Football"],
        mainTheme: "Football",
        activity: "Press-photo pose",
        colorPalette: ["Red and black"],
        mood: "Romantic",
        pose: "Side-by-side duo pose",
        expression: "Confident smile",
        background: "Football stadium",
        composition: "Cinematic group portrait",
        cameraAngle: "Eye level",
        lighting: "Glossy studio lighting",
        chibiFinish: "Editorial luxury chibi",
        orientation: "Portrait 4:5",
      },
    },

    "preset-best-friends": {
      label: "Best Friend Hype Duo",
      purpose: "Playful coordinated duo.",
      values: {
        characterCount: "Two",
        characterConfiguration: "All-female group",
        groupFormat: "Best-friend duo",
        groupRelationship: "Best friends",
        bodyType: "Curvy",
        hairStyle: "Knotless braids",
        hairColor: ["Black with burgundy ends"],
        groomingStyle: "Soft glam",
        outfitStyle: "Matching squad outfits",
        footwear: "Fashion sneakers",
        jewelry: ["Hoop earrings"],
        accessories: ["Sunglasses"],
        sportsGear: ["Basketball"],
        mainTheme: "Everyday luxury",
        activity: "Group celebration",
        colorPalette: ["Pink and gold"],
        mood: "Playful and energetic",
        pose: "Back-to-back duo pose",
        expression: "Joyful laughter",
        background: "Urban city street",
        composition: "Promotional flyer composition",
        cameraAngle: "Wide-angle view",
        lighting: "Bright commercial lighting",
        chibiFinish: "High-gloss exaggerated chibi",
        orientation: "Vertical 9:16",
      },
    },

    "preset-football-squad": {
      label: "Football Hype Squad",
      purpose: "Full team poster.",
      values: {
        characterCount: "Six",
        characterConfiguration: "Mixed-gender group",
        groupFormat: "Full squad",
        groupRelationship: "Teammates",
        bodyType: "Mixed body types",
        groomingStyle: "Mixed coordinated grooming",
        outfitStyle: "Professional team uniform",
        footwear: "Cleats",
        jewelry: ["Coordinated jewelry"],
        accessories: ["None"],
        sportsGear: ["Football"],
        mainTheme: "Football",
        activity: "Team huddle",
        colorPalette: ["Team colors"],
        mood: "Team-focused",
        pose: "Coordinated squad pose",
        expression: "Coordinated mixed expressions",
        background: "Football stadium",
        composition: "Wide team poster",
        cameraAngle: "Slight low angle",
        lighting: "Stadium lights",
        chibiFinish: "Animated sports chibi",
        orientation: "Landscape 16:9",
      },
    },

    "preset-soccer-stars": {
      label: "Soccer Stars",
      purpose: "Energetic soccer team artwork.",
      values: {
        characterCount: "Four",
        characterConfiguration: "Mixed-gender group",
        groupFormat: "Small team",
        groupRelationship: "Teammates",
        bodyType: "Athletic",
        groomingStyle: "Mixed coordinated grooming",
        outfitStyle: "Professional team uniform",
        footwear: "Cleats",
        sportsGear: ["Soccer ball"],
        mainTheme: "Soccer",
        activity: "In-game action",
        colorPalette: ["Green and gold"],
        mood: "Fierce and competitive",
        pose: "Mid-action pose",
        expression: "Focused expression",
        background: "Soccer field",
        composition: "Cinematic group portrait",
        cameraAngle: "Wide-angle view",
        lighting: "Golden-hour lighting",
        chibiFinish: "Premium 3D glossy chibi",
        orientation: "Landscape 16:9",
      },
    },

    "preset-boxing-champion": {
      label: "Knockout Champion",
      purpose: "Dramatic solo boxing character.",
      values: {
        characterCount: "One",
        characterConfiguration: "Female",
        groupFormat: "Solo",
        groupRelationship: "None",
        bodyType: "Muscular",
        hairStyle: "High ponytail",
        hairColor: ["Black"],
        groomingStyle: "Sporty fresh-faced",
        outfitStyle: "Glam sports fashion",
        footwear: "Boxing boots",
        accessories: ["Championship belt"],
        sportsGear: ["Boxing gloves"],
        mainTheme: "Boxing",
        activity: "Championship moment",
        colorPalette: ["Burgundy and gold"],
        mood: "Powerful and commanding",
        pose: "Victory pose",
        expression: "Fierce game face",
        background: "Boxing gym",
        composition: "Magazine cover",
        cameraAngle: "Dramatic low angle",
        lighting: "Dramatic rim lighting",
        chibiFinish: "Collectible figurine chibi",
        orientation: "Portrait 4:5",
      },
    },

    "preset-cheer-squad": {
      label: "Cheer Squad Energy",
      purpose: "Bright group cheer artwork.",
      values: {
        characterCount: "Five",
        characterConfiguration: "All-female group",
        groupFormat: "Full squad",
        groupRelationship: "Teammates",
        bodyType: "Mixed body types",
        outfitStyle: "Matching squad outfits",
        outfitDetails: ["Coordinated team set"],
        footwear: "Statement sneakers",
        jewelry: ["Coordinated jewelry"],
        sportsGear: ["Cheer pom-poms"],
        mainTheme: "Cheerleading",
        activity: "Group celebration",
        colorPalette: ["Bold primary colors"],
        mood: "Fun and celebratory",
        pose: "Coordinated squad pose",
        expression: "Excited celebration",
        background: "Cheer competition floor",
        composition: "Wide team poster",
        cameraAngle: "Eye level",
        lighting: "Bright commercial lighting",
        chibiFinish: "Fashion-doll chibi",
        orientation: "Landscape 16:9",
      },
    },

    "preset-birthday-mvp": {
      label: "Birthday MVP",
      purpose: "Sports-inspired birthday artwork.",
      values: {
        characterCount: "One",
        characterConfiguration: "Female",
        groupFormat: "Solo",
        groupRelationship: "None",
        bodyType: "Plus-size",
        hairStyle: "Long body waves",
        hairColor: ["Burgundy"],
        groomingStyle: "Bold editorial glam",
        outfitStyle: "Celebration outfit",
        footwear: "Platform sneakers",
        jewelry: ["Nameplate necklace"],
        accessories: ["Trophy"],
        sportsGear: ["None"],
        mainTheme: "Birthday celebration",
        activity: "Victory celebration",
        colorPalette: ["Pink and gold"],
        mood: "Joyful",
        pose: "Power stance",
        expression: "Joyful laughter",
        background: "Party venue",
        composition: "Magazine cover",
        cameraAngle: "Slight low angle",
        lighting: "Soft luxury lighting",
        chibiFinish: "Editorial luxury chibi",
        orientation: "Portrait 4:5",
      },
    },

    "preset-graduation-champion": {
      label: "Graduation Champion",
      purpose: "Graduation celebration with sports energy.",
      values: {
        characterCount: "One",
        characterConfiguration: "Male",
        groupFormat: "Solo",
        groupRelationship: "None",
        bodyType: "Broad-built",
        hairStyle: "Waves",
        hairColor: ["Black"],
        groomingStyle: "Clean-cut masculine",
        outfitStyle: "Varsity fashion",
        footwear: "Statement sneakers",
        jewelry: ["Luxury watch"],
        accessories: ["Medal"],
        sportsGear: ["None"],
        mainTheme: "Graduation",
        activity: "Championship moment",
        colorPalette: ["Royal blue and gold"],
        mood: "Inspirational",
        pose: "Victory pose",
        expression: "Confident smile",
        background: "Championship stage",
        composition: "Promotional flyer composition",
        cameraAngle: "Eye level",
        lighting: "Arena spotlight",
        chibiFinish: "Premium 3D glossy chibi",
        orientation: "Portrait 4:5",
      },
    },

    "preset-girls-trip": {
      label: "Girls’ Trip Hype Crew",
      purpose: "Fun lifestyle group.",
      values: {
        characterCount: "Four",
        characterConfiguration: "All-female group",
        groupFormat: "Full squad",
        groupRelationship: "Best friends",
        bodyType: "Mixed body types",
        groomingStyle: "Mixed coordinated grooming",
        outfitStyle: "Designer-inspired fashion",
        footwear: "Fashion sneakers",
        jewelry: ["Coordinated jewelry"],
        accessories: ["Designer-inspired handbag"],
        sportsGear: ["None"],
        mainTheme: "Girls’ trip",
        activity: "Lifestyle portrait",
        colorPalette: ["Jewel tones"],
        mood: "Fun and celebratory",
        pose: "Coordinated squad pose",
        expression: "Joyful laughter",
        background: "Rooftop",
        composition: "Cinematic group portrait",
        cameraAngle: "Eye level",
        lighting: "Golden-hour lighting",
        chibiFinish: "Editorial luxury chibi",
        orientation: "Vertical 9:16",
      },
    },

    "preset-boss-team": {
      label: "Boss Mode Team",
      purpose: "Entrepreneurial team artwork.",
      values: {
        characterCount: "Three",
        characterConfiguration: "Mixed-gender group",
        groupFormat: "Small team",
        groupRelationship: "Creative collaborators",
        bodyType: "Mixed body types",
        groomingStyle: "Mixed coordinated grooming",
        outfitStyle: "Business-casual lifestyle",
        footwear: "Fashion sneakers",
        jewelry: ["Luxury watch"],
        accessories: ["Smartphone"],
        sportsGear: ["None"],
        mainTheme: "Entrepreneurship",
        activity: "Business power pose",
        colorPalette: ["Black and gold"],
        mood: "Bold and confident",
        pose: "Coordinated squad pose",
        expression: "Calm confidence",
        background: "Luxury studio",
        composition: "Magazine cover",
        cameraAngle: "Slight low angle",
        lighting: "High-contrast editorial lighting",
        chibiFinish: "Editorial luxury chibi",
        orientation: "Portrait 4:5",
      },
    },
  };

  const state = {
    locks: new Set(),
    activeTab: "character",
    generatedPrompt: "",
    variations: [],
    outputState: "empty",
    lastFocusedElement: null,
  };

  const dom = {};

  function cacheDom() {
    dom.presetSelect = document.getElementById("presetSelect");
    dom.presetDescription = document.getElementById("presetDescription");
    dom.applyPresetBtn = document.getElementById("applyPresetBtn");
    dom.generatePromptBtn = document.getElementById("generatePromptBtn");
    dom.randomizeAllBtn = document.getElementById("randomizeAllBtn");
    dom.clearAllBtn = document.getElementById("clearAllBtn");
    dom.savePromptBtn = document.getElementById("savePromptBtn");
    dom.openHistoryBtn = document.getElementById("openHistoryBtn");

    dom.validationSummary = document.getElementById("validationSummary");
    dom.validationList = document.getElementById("validationList");
    dom.qualityResult = document.getElementById("qualityResult");
    dom.outputStatusMessage = document.getElementById("outputStatusMessage");
    dom.promptOutput = document.getElementById("promptOutput");
    dom.copyPromptBtn = document.getElementById("copyPromptBtn");
    dom.saveOutputBtn = document.getElementById("saveOutputBtn");
    dom.generateVariationsBtn = document.getElementById(
      "generateVariationsBtn",
    );
    dom.variationsPanel = document.getElementById("variationsPanel");

    dom.historyModal = document.getElementById("historyModal");
    dom.historyList = document.getElementById("historyList");
    dom.clearHistoryBtn = document.getElementById("clearHistoryBtn");
    dom.closeHistoryModalBtn = document.getElementById("closeHistoryModalBtn");

    dom.clearConfirmationModal = document.getElementById(
      "clearConfirmationModal",
    );
    dom.confirmClearAllBtn = document.getElementById("confirmClearAllBtn");
    dom.clearSelectionsOnlyBtn = document.getElementById(
      "clearSelectionsOnlyBtn",
    );

    dom.toastRegion = document.getElementById("toastRegion");
    dom.tabs = [...document.querySelectorAll('[role="tab"][data-tab-key]')];
    dom.panels = [
      ...document.querySelectorAll('[role="tabpanel"][data-tab-key]'),
    ];
    dom.categories = [...document.querySelectorAll("[data-category-key]")];
  }

  function getControlElement(key) {
    return (
      document.getElementById(key) ||
      document.querySelector(`[data-control-key="${CSS.escape(key)}"]`)
    );
  }

  function isCheckboxGroup(key) {
    const group = document.querySelector(
      `[data-control-key="${CSS.escape(key)}"]`,
    );
    return Boolean(group && group.matches("fieldset, .chip-group"));
  }

  function getControlValue(key) {
    if (isCheckboxGroup(key)) {
      return [
        ...document.querySelectorAll(
          `input[name="${CSS.escape(key)}"]:checked`,
        ),
      ].map((input) => input.value);
    }

    const element = document.getElementById(key);
    if (!element) return "";

    return typeof element.value === "string"
      ? element.value.trim()
      : element.value;
  }

  function setControlValue(key, value, options = {}) {
    const { preserveProtected = false } = options;

    if (preserveProtected && PROTECTED_TEXT_KEYS.includes(key)) {
      return;
    }

    if (isCheckboxGroup(key)) {
      const values = Array.isArray(value) ? value : [];
      const checkboxes = document.querySelectorAll(
        `input[name="${CSS.escape(key)}"]`,
      );

      checkboxes.forEach((checkbox) => {
        if (checkbox.disabled && checkbox.value === "No minors") {
          checkbox.checked = true;
          return;
        }

        checkbox.checked = values.includes(checkbox.value);
      });

      if (key === "negativeInstructions") {
        const noMinors = document.getElementById(
          "negativeInstructions-noMinors",
        );
        if (noMinors) noMinors.checked = true;
      }

      return;
    }

    const element = document.getElementById(key);
    if (!element) return;

    element.value = value ?? "";
  }

  function getAllValues() {
    const values = {};

    Object.keys(CONTROL_CATEGORY).forEach((key) => {
      values[key] = getControlValue(key);
    });

    return values;
  }

  function applyValues(values, options = {}) {
    Object.entries(values).forEach(([key, value]) => {
      const category = CONTROL_CATEGORY[key];
      if (!category) return;
      if (state.locks.has(category)) return;

      setControlValue(key, value, options);
    });

    enforcePermanentRules();
    markOutputOutdated();
    persistFormState();
  }

  function getOptionsForKey(key) {
    if (isCheckboxGroup(key)) {
      return [...document.querySelectorAll(`input[name="${CSS.escape(key)}"]`)]
        .filter((input) => !input.disabled)
        .map((input) => input.value);
    }

    const element = document.getElementById(key);
    if (!element || element.tagName !== "SELECT") return [];

    return [...element.options].map((option) => option.value).filter(Boolean);
  }

  function randomItem(items) {
    return items[Math.floor(Math.random() * items.length)];
  }

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function uniqueRandomItems(items, count) {
    const pool = [...new Set(items)];
    const selected = [];

    while (pool.length && selected.length < count) {
      const index = Math.floor(Math.random() * pool.length);
      selected.push(pool.splice(index, 1)[0]);
    }

    return selected;
  }

  function randomizeControl(key) {
    if (NON_RANDOMIZABLE_KEYS.includes(key)) return;

    const category = CONTROL_CATEGORY[key];
    if (!category || state.locks.has(category)) return;

    const options = getOptionsForKey(key);
    if (!options.length) return;

    if (isCheckboxGroup(key)) {
      const [min, max] = RANDOM_LIMITS[key] || [0, Math.min(options.length, 3)];
      let eligible = options.filter((option) => option !== "None");

      if (min === 0 && Math.random() < 0.28 && options.includes("None")) {
        setControlValue(key, ["None"]);
        return;
      }

      const count = randomInt(min, Math.min(max, eligible.length));
      setControlValue(key, uniqueRandomItems(eligible, count));
      return;
    }

    setControlValue(key, randomItem(options));
  }

  function randomizeCategory(categoryKey) {
    if (state.locks.has(categoryKey)) {
      showToast("This category is locked.", "warning");
      return;
    }

    Object.entries(CONTROL_CATEGORY)
      .filter(([, category]) => category === categoryKey)
      .forEach(([key]) => randomizeControl(key));

    reconcileCharacterSetup();
    reconcileThemeGear();
    enforcePermanentRules();
    markOutputOutdated();
    persistFormState();
    showToast("Category randomized.", "success");
  }

  function randomizeAll() {
    CATEGORY_KEYS.forEach((categoryKey) => {
      if (state.locks.has(categoryKey)) return;

      Object.entries(CONTROL_CATEGORY)
        .filter(([, category]) => category === categoryKey)
        .forEach(([key]) => randomizeControl(key));
    });

    reconcileCharacterSetup();
    reconcileThemeGear();
    enforcePermanentRules();
    markOutputOutdated();
    persistFormState();
    showToast("Unlocked categories randomized.", "success");
  }

  function reconcileCharacterSetup() {
    const count = getControlValue("characterCount");
    const format = getControlValue("groupFormat");

    if (format === "Solo") {
      setControlValue("characterCount", "One");
      setControlValue("groupRelationship", "None");
      return;
    }

    if (
      ["Couple", "Best-friend duo", "Sibling duo", "Sports duo"].includes(
        format,
      )
    ) {
      setControlValue("characterCount", "Two");
    }

    if (format === "Small team" && ["One", "Two"].includes(count)) {
      setControlValue("characterCount", "Three");
    }

    if (format === "Full squad" && ["One", "Two"].includes(count)) {
      setControlValue("characterCount", "Four");
    }
  }

  function reconcileThemeGear() {
    const theme = getControlValue("mainTheme");
    const recommendedGear = THEME_GEAR_MAP[theme];

    if (!recommendedGear) return;

    const selectedGear = getControlValue("sportsGear");
    if (
      !Array.isArray(selectedGear) ||
      selectedGear.length === 0 ||
      selectedGear.includes("None")
    ) {
      setControlValue("sportsGear", recommendedGear);
    }
  }

  function enforcePermanentRules() {
    const noMinors = document.getElementById("negativeInstructions-noMinors");
    if (noMinors) noMinors.checked = true;

    document.querySelectorAll("[data-none-option]").forEach((noneInput) => {
      if (!noneInput.checked) return;

      const groupName = noneInput.name;
      document
        .querySelectorAll(`input[name="${CSS.escape(groupName)}"]`)
        .forEach((input) => {
          if (input !== noneInput) input.checked = false;
        });
    });
  }

  function handleChipChange(event) {
    const input = event.target;
    if (!(input instanceof HTMLInputElement) || input.type !== "checkbox") {
      return;
    }

    const group = input.closest("[data-control-key]");
    if (!group) return;

    const groupName = input.name;
    const max = Number(group.dataset.selectionLimit || 0);
    const all = [
      ...document.querySelectorAll(`input[name="${CSS.escape(groupName)}"]`),
    ];
    const noneInput = all.find((item) => item.hasAttribute("data-none-option"));

    if (input.hasAttribute("data-none-option") && input.checked) {
      all.forEach((item) => {
        if (item !== input) item.checked = false;
      });
    } else if (input.checked && noneInput) {
      noneInput.checked = false;
    }

    const checked = all.filter((item) => item.checked);

    if (max > 0 && checked.length > max) {
      input.checked = false;
      showToast(`Choose no more than ${max} options.`, "warning");
    }

    if (
      ["hairColor", "colorPalette", "surfaceFinish"].includes(
        group.dataset.controlKey,
      ) &&
      all.filter((item) => item.checked).length === 0
    ) {
      input.checked = true;
      showToast("At least one option is required.", "warning");
    }

    if (input.name === "negativeInstructions" && input.value === "No minors") {
      input.checked = true;
    }

    markOutputOutdated();
    persistFormState();
  }

  function clearCategory(categoryKey) {
    if (state.locks.has(categoryKey)) {
      showToast("Unlock this category before clearing it.", "warning");
      return;
    }

    Object.entries(CONTROL_CATEGORY)
      .filter(([, category]) => category === categoryKey)
      .forEach(([key]) => {
        setControlValue(key, DEFAULTS[key]);
      });

    enforcePermanentRules();
    markOutputOutdated();
    persistFormState();
    showToast("Category reset.", "success");
  }

  function resetGenerator({ preserveCustomText = false } = {}) {
    const protectedValues = {};

    if (preserveCustomText) {
      PROTECTED_TEXT_KEYS.forEach((key) => {
        protectedValues[key] = getControlValue(key);
      });
    }

    Object.entries(DEFAULTS).forEach(([key, value]) => {
      setControlValue(key, value);
    });

    if (preserveCustomText) {
      Object.entries(protectedValues).forEach(([key, value]) => {
        setControlValue(key, value);
      });
    }

    state.locks.clear();
    renderLocks();

    state.generatedPrompt = "";
    state.variations = [];
    state.outputState = "empty";

    clearValidation();
    renderOutput();
    renderVariations();
    enforcePermanentRules();
    persistFormState();
    persistLocks();

    closeModal(dom.clearConfirmationModal);
    showToast(
      preserveCustomText
        ? "Selections cleared. Your custom text was kept."
        : "Generator cleared.",
      "success",
    );
  }

  function applyPreset() {
    const presetId = dom.presetSelect.value;
    const preset = PRESETS[presetId];

    if (!preset) {
      showToast("Choose a preset first.", "warning");
      dom.presetSelect.focus();
      return;
    }

    applyValues(preset.values, { preserveProtected: true });
    reconcileCharacterSetup();
    enforcePermanentRules();

    dom.presetDescription.textContent = preset.purpose;
    showToast(`${preset.label} applied.`, "success");
  }

  function countToPhrase(value) {
    const map = {
      One: "one",
      Two: "two",
      Three: "three",
      Four: "four",
      Five: "five",
      Six: "six",
    };

    return map[value] || String(value).toLowerCase();
  }

  function formatList(items) {
    const filtered = [
      ...new Set(
        (Array.isArray(items) ? items : [items])
          .map((item) => String(item || "").trim())
          .filter((item) => item && item !== "None"),
      ),
    ];

    if (!filtered.length) return "";
    if (filtered.length === 1) return filtered[0];
    if (filtered.length === 2) return `${filtered[0]} and ${filtered[1]}`;

    return `${filtered.slice(0, -1).join(", ")}, and ${filtered.at(-1)}`;
  }

  function lowerFirst(value) {
    if (!value) return "";
    return value.charAt(0).toLowerCase() + value.slice(1);
  }

  function sentence(value) {
    const clean = String(value || "")
      .replace(/\s+/g, " ")
      .replace(/\s+,/g, ",")
      .replace(/,+/g, ",")
      .trim();

    if (!clean) return "";
    return /[.!?]$/.test(clean) ? clean : `${clean}.`;
  }

  function hasCustomText(values) {
    return PROTECTED_TEXT_KEYS.some((key) => Boolean(values[key]));
  }

  function assemblePrompt(values) {
    const segments = [];

    segments.push(
      `Create a fully original ${lowerFirst(values.chibiFinish)} image with exaggerated chibi proportions, a polished glossy finish, and ${lowerFirst(values.detailLevel)} rendering.`,
    );

    const subjectParts = [
      `${countToPhrase(values.characterCount)} adult ${lowerFirst(values.characterConfiguration)} character${values.characterCount === "One" ? "" : "s"}`,
      lowerFirst(values.groupFormat),
    ];

    if (values.groupRelationship && values.groupRelationship !== "None") {
      subjectParts.push(lowerFirst(values.groupRelationship));
    }

    segments.push(
      `Feature ${formatList(subjectParts)}. All characters must clearly be adults.`,
    );

    const appearanceParts = [
      `${lowerFirst(values.skinTone)} skin tone`,
      `${lowerFirst(values.bodyType)} body type`,
      formatList(values.facialFeatures),
      lowerFirst(values.eyeStyle),
      lowerFirst(values.hairStyle),
      `${lowerFirst(formatList(values.hairColor))} hair`,
      lowerFirst(values.groomingStyle),
    ].filter(Boolean);

    segments.push(
      `Give the character${values.characterCount === "One" ? "" : "s"} ${formatList(appearanceParts)}.`,
    );

    const fashionParts = [
      lowerFirst(values.outfitStyle),
      formatList(values.outfitDetails),
      lowerFirst(values.footwear),
      formatList(values.jewelry),
      formatList(values.accessories),
      formatList(values.sportsGear),
    ].filter(Boolean);

    segments.push(
      `Style the character${values.characterCount === "One" ? "" : "s"} with ${formatList(fashionParts)}.`,
    );

    segments.push(
      `Build the concept around ${lowerFirst(values.mainTheme)} with ${lowerFirst(values.activity)}.`,
    );

    segments.push(
      `Use ${lowerFirst(values.pose)} and ${lowerFirst(values.expression)}.`,
    );

    const environmentParts = [
      lowerFirst(values.background),
      formatList(values.backgroundDetails),
    ].filter(Boolean);

    segments.push(`Set the scene in ${formatList(environmentParts)}.`);

    segments.push(
      `Use a ${lowerFirst(formatList(values.colorPalette))} color palette with a ${lowerFirst(values.mood)} mood.`,
    );

    segments.push(
      `Frame the image as a ${lowerFirst(values.composition)} from a ${lowerFirst(values.cameraAngle)} using ${lowerFirst(values.lighting)}.`,
    );

    const textInstructions = [];

    if (values.customName) {
      textInstructions.push(`Include the exact name “${values.customName}”`);
    }

    if (values.jerseyNumber) {
      textInstructions.push(`display jersey number “${values.jerseyNumber}”`);
    }

    if (values.mainSlogan) {
      textInstructions.push(`add the exact slogan “${values.mainSlogan}”`);
    }

    if (values.supportingWords) {
      textInstructions.push(
        `include the exact supporting words “${values.supportingWords}”`,
      );
    }

    if (textInstructions.length) {
      segments.push(
        `${sentence(formatList(textInstructions))} Use ${lowerFirst(values.typographyStyle)} with ${lowerFirst(values.textPlacement)}. Do not rewrite or invent any text.`,
      );
    }

    const finishParts = [
      formatList(values.surfaceFinish),
      lowerFirst(values.detailLevel),
      lowerFirst(values.orientation),
    ].filter(Boolean);

    segments.push(
      `Finish with ${formatList(finishParts)}, clean anatomy, readable visual hierarchy, balanced depth, and premium commercial polish.`,
    );

    const negatives = formatList(values.negativeInstructions);

    if (negatives) {
      segments.push(`Avoid ${lowerFirst(negatives)}.`);
    }

    return cleanupPrompt(segments.map(sentence).join(" "));
  }

  function cleanupPrompt(prompt) {
    return String(prompt)
      .replace(/\s+/g, " ")
      .replace(/\s+([,.!?])/g, "$1")
      .replace(/([,.!?])\1+/g, "$1")
      .replace(/\.\s*\./g, ".")
      .trim();
  }

  function validate() {
    const values = getAllValues();
    const errors = [];

    clearFieldErrors();

    REQUIRED_KEYS.forEach((key) => {
      const value = values[key];
      const missing = Array.isArray(value)
        ? value.length === 0
        : !String(value || "").trim();

      if (missing) {
        errors.push({
          key,
          message: `${humanizeKey(key)} is required.`,
        });
      }
    });

    const count = values.characterCount;
    const format = values.groupFormat;

    if (format === "Solo" && count !== "One") {
      errors.push({
        key: "groupFormat",
        message: "Solo format requires one character.",
      });
    }

    if (
      ["Couple", "Best-friend duo", "Sibling duo", "Sports duo"].includes(
        format,
      ) &&
      count !== "Two"
    ) {
      errors.push({
        key: "groupFormat",
        message: `${format} requires two characters.`,
      });
    }

    if (format === "Full squad" && ["One", "Two"].includes(count)) {
      errors.push({
        key: "groupFormat",
        message: "Full squad requires at least three characters.",
      });
    }

    if (format === "Solo" && values.groupRelationship !== "None") {
      errors.push({
        key: "groupRelationship",
        message: "Group relationship must be None for a solo character.",
      });
    }

    if (
      values.jerseyNumber &&
      !/^[A-Za-z0-9]{1,3}$/.test(values.jerseyNumber)
    ) {
      errors.push({
        key: "jerseyNumber",
        message: "Jersey number must contain one to three letters or numbers.",
      });
    }

    if (
      hasCustomText(values) &&
      (!values.typographyStyle || !values.textPlacement)
    ) {
      errors.push({
        key: "typographyStyle",
        message:
          "Typography style and placement are required when custom text is used.",
      });
    }

    const negativeValues = values.negativeInstructions || [];
    if (!negativeValues.includes("No minors")) {
      errors.push({
        key: "negativeInstructions",
        message: "The adult-only rule must remain enabled.",
      });
    }

    document.querySelectorAll("[data-selection-limit]").forEach((group) => {
      const key = group.dataset.controlKey;
      const max = Number(group.dataset.selectionLimit || 0);
      const selected = getControlValue(key);

      if (Array.isArray(selected) && max && selected.length > max) {
        errors.push({
          key,
          message: `${humanizeKey(key)} allows no more than ${max} selections.`,
        });
      }
    });

    const recommendedGear = THEME_GEAR_MAP[values.mainTheme];
    const selectedGear = values.sportsGear || [];

    if (
      recommendedGear &&
      selectedGear.length &&
      !selectedGear.includes("None") &&
      !selectedGear.some((gear) => recommendedGear.includes(gear))
    ) {
      errors.push({
        key: "sportsGear",
        message: "The selected sports gear does not match the main theme.",
      });
    }

    return {
      valid: errors.length === 0,
      errors,
      values,
    };
  }

  function humanizeKey(key) {
    return key
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/^./, (character) => character.toUpperCase());
  }

  function renderValidation(errors) {
    clearValidation();

    if (!errors.length) return;

    dom.validationList.innerHTML = "";

    errors.forEach(({ key, message }) => {
      const item = document.createElement("li");
      item.textContent = message;
      dom.validationList.appendChild(item);
      markFieldError(key);
    });

    dom.validationSummary.hidden = false;
    setQuality("Incomplete", "incomplete");
  }

  function markFieldError(key) {
    const control = getControlElement(key);
    if (!control) return;

    const fieldGroup = control.closest(".field-group, .chip-group");
    const category = control.closest("[data-category-key]");

    if (fieldGroup) {
      fieldGroup.classList.add("is-invalid");
    }

    if (category) {
      category.classList.add("has-error");
      const tabKey = CATEGORY_TABS[category.dataset.categoryKey];
      const tab = document.getElementById(`tab-${tabKey}`);
      if (tab) tab.classList.add("is-invalid");
    }
  }

  function clearFieldErrors() {
    document.querySelectorAll(".is-invalid, .has-error").forEach((element) => {
      element.classList.remove("is-invalid", "has-error");
    });

    dom.tabs.forEach((tab) => tab.classList.remove("is-invalid"));
  }

  function clearValidation() {
    dom.validationSummary.hidden = true;
    dom.validationList.innerHTML = "";
    clearFieldErrors();
  }

  function focusFirstError(errors) {
    if (!errors.length) return;

    const first = getControlElement(errors[0].key);
    if (!first) return;

    const category = CONTROL_CATEGORY[errors[0].key];
    const tabKey = CATEGORY_TABS[category];

    if (tabKey) activateTab(tabKey);

    window.setTimeout(() => {
      const focusTarget = first.matches("fieldset")
        ? first.querySelector("input, select, button")
        : first;

      focusTarget?.focus();
    }, 50);
  }

  function generatePrompt() {
    setButtonLoading(dom.generatePromptBtn, true, "Generating...");

    window.setTimeout(() => {
      const result = validate();

      if (!result.valid) {
        renderValidation(result.errors);
        focusFirstError(result.errors);
        setButtonLoading(dom.generatePromptBtn, false);
        showToast("Review the highlighted fields.", "error");
        return;
      }

      clearValidation();

      state.generatedPrompt = assemblePrompt(result.values);
      state.outputState = "current";
      state.variations = [];

      renderOutput();
      renderVariations();
      setQuality("Ready", "ready");
      setButtonLoading(dom.generatePromptBtn, false);

      dom.promptOutput.focus();
      showToast("Your Hype Squad Chibi prompt is ready.", "success");
    }, 120);
  }

  function setQuality(label, stateName) {
    dom.qualityResult.textContent = label;
    dom.qualityResult.className = `quality-badge is-${stateName}`;
  }

  function renderOutput() {
    const hasPrompt = Boolean(state.generatedPrompt);

    dom.promptOutput.classList.toggle("is-empty", !hasPrompt);
    dom.promptOutput.dataset.outputState = state.outputState;

    if (!hasPrompt) {
      dom.promptOutput.textContent =
        "Your complete Hype Squad Chibi prompt will appear here.";
      dom.outputStatusMessage.textContent =
        "Your complete Hype Squad Chibi prompt will appear here.";
      dom.copyPromptBtn.disabled = true;
      dom.saveOutputBtn.disabled = true;
      dom.generateVariationsBtn.disabled = true;
      setQuality("Incomplete", "incomplete");
      return;
    }

    dom.promptOutput.textContent = state.generatedPrompt;
    dom.copyPromptBtn.disabled = false;
    dom.saveOutputBtn.disabled = false;
    dom.generateVariationsBtn.disabled = false;

    if (state.outputState === "outdated") {
      dom.outputStatusMessage.textContent =
        "You changed your selections. Generate again to update the prompt.";
      setQuality("Needs Attention", "needs-attention");
    } else {
      dom.outputStatusMessage.textContent =
        "Your Hype Squad Chibi prompt is ready.";
      setQuality("Ready", "ready");
    }
  }

  function markOutputOutdated() {
    if (!state.generatedPrompt) return;

    state.outputState = "outdated";
    state.variations = [];
    renderOutput();
    renderVariations();
  }

  function createVariation(basePrompt, index) {
    const introductions = [
      "Create a premium promotional interpretation of this concept:",
      "Create a cinematic collectible-art variation of this concept:",
      "Create a bold editorial poster variation of this concept:",
    ];

    const endings = [
      "Emphasize polished character styling, strong visual hierarchy, and crisp commercial detail.",
      "Emphasize dimensional lighting, dramatic depth, and a cohesive high-gloss finish.",
      "Emphasize confident posing, readable typography, and a clean luxury sports composition.",
    ];

    return cleanupPrompt(
      `${introductions[index]} ${basePrompt} ${endings[index]}`,
    );
  }

  function generateVariations() {
    if (!state.generatedPrompt) {
      showToast("Generate your main prompt first.", "warning");
      return;
    }

    setButtonLoading(dom.generateVariationsBtn, true, "Creating Variations...");

    window.setTimeout(() => {
      state.variations = [0, 1, 2].map((index) =>
        createVariation(state.generatedPrompt, index),
      );

      renderVariations();
      setButtonLoading(dom.generateVariationsBtn, false);
      showToast("Three prompt variations are ready.", "success");
    }, 120);
  }

  function renderVariations() {
    const hasVariations = state.variations.length === 3;
    dom.variationsPanel.hidden = !hasVariations;

    [1, 2, 3].forEach((number) => {
      const output = document.getElementById(`variationOutput-${number}`);
      if (output) {
        output.textContent = hasVariations ? state.variations[number - 1] : "";
      }
    });
  }

  function useVariation(number) {
    const variation = state.variations[number - 1];
    if (!variation) return;

    state.generatedPrompt = variation;
    state.outputState = "current";
    renderOutput();
    dom.promptOutput.focus();
    showToast(`Variation ${number} is now your main prompt.`, "success");
  }

  async function copyText(text, successMessage) {
    if (!text) {
      showToast("There is nothing to copy yet.", "warning");
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      showToast(successMessage, "success");
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();

      try {
        document.execCommand("copy");
        showToast(successMessage, "success");
      } catch {
        showToast(
          "Copy failed. Select the prompt and copy it manually.",
          "error",
        );
      } finally {
        textarea.remove();
      }
    }
  }

  function getHistory() {
    try {
      const parsed = JSON.parse(
        localStorage.getItem(STORAGE_KEYS.history) || "[]",
      );
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  function setHistory(history) {
    try {
      localStorage.setItem(STORAGE_KEYS.history, JSON.stringify(history));
    } catch {
      showToast("History could not be saved in this browser.", "error");
    }
  }

  function savePrompt() {
    if (!state.generatedPrompt) {
      showToast("Generate a prompt before saving.", "warning");
      return;
    }

    const result = validate();

    if (!result.valid) {
      renderValidation(result.errors);
      focusFirstError(result.errors);
      showToast("Fix the prompt before saving.", "error");
      return;
    }

    const history = getHistory();
    const customName = result.values.customName;
    const presetLabel =
      PRESETS[dom.presetSelect.value]?.label || "Hype Squad Chibi Prompt";

    const record = {
      id: crypto.randomUUID
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      title: customName ? `${customName} Chibi Prompt` : presetLabel,
      prompt: state.generatedPrompt,
      values: result.values,
      locks: [...state.locks],
      createdAt: new Date().toISOString(),
    };

    history.unshift(record);
    setHistory(history.slice(0, 100));
    renderHistory();
    showToast("Prompt saved to History.", "success");
  }

  function renderHistory() {
    const history = getHistory();
    dom.historyList.innerHTML = "";

    if (!history.length) {
      const empty = document.createElement("p");
      empty.className = "empty-state";
      empty.textContent = "You haven’t saved any prompts yet.";
      dom.historyList.appendChild(empty);
      dom.clearHistoryBtn.disabled = true;
      return;
    }

    dom.clearHistoryBtn.disabled = false;

    history.forEach((record) => {
      const article = document.createElement("article");
      article.className = "history-item";

      const title = document.createElement("h3");
      title.textContent = record.title || "Saved Prompt";

      const time = document.createElement("time");
      time.dateTime = record.createdAt;
      time.textContent = new Intl.DateTimeFormat("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(new Date(record.createdAt));

      const preview = document.createElement("p");
      preview.className = "history-preview";
      preview.textContent = record.prompt;

      const actions = document.createElement("div");
      actions.className = "history-actions";

      [
        ["load", "Load"],
        ["copy", "Copy"],
        ["delete", "Delete"],
      ].forEach(([action, label]) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className =
          action === "delete"
            ? "button button-danger-outline"
            : "button button-secondary";
        button.dataset.historyAction = action;
        button.dataset.historyId = record.id;
        button.textContent = label;
        actions.appendChild(button);
      });

      article.append(title, time, preview, actions);
      dom.historyList.appendChild(article);
    });
  }

  function handleHistoryAction(action, id) {
    const history = getHistory();
    const record = history.find((item) => item.id === id);

    if (!record) return;

    if (action === "load") {
      Object.entries(record.values || {}).forEach(([key, value]) => {
        setControlValue(key, value);
      });

      state.locks = new Set(record.locks || []);
      state.generatedPrompt = record.prompt || "";
      state.outputState = "current";
      state.variations = [];

      renderLocks();
      renderOutput();
      renderVariations();
      enforcePermanentRules();
      persistFormState();
      persistLocks();

      closeModal(dom.historyModal);
      showToast("Saved prompt loaded.", "success");
      return;
    }

    if (action === "copy") {
      copyText(record.prompt, "Saved prompt copied.");
      return;
    }

    if (action === "delete") {
      const updated = history.filter((item) => item.id !== id);
      setHistory(updated);
      renderHistory();
      showToast("Saved prompt deleted.", "success");
    }
  }

  function clearHistory() {
    setHistory([]);
    renderHistory();
    showToast("Prompt History cleared.", "success");
  }

  function toggleLock(categoryKey) {
    if (state.locks.has(categoryKey)) {
      state.locks.delete(categoryKey);
    } else {
      state.locks.add(categoryKey);
    }

    renderLocks();
    persistLocks();
  }

  function renderLocks() {
    CATEGORY_KEYS.forEach((categoryKey) => {
      const locked = state.locks.has(categoryKey);
      const category = document.querySelector(
        `[data-category-key="${CSS.escape(categoryKey)}"]`,
      );
      const button = document.querySelector(
        `[data-lock-category="${CSS.escape(categoryKey)}"]`,
      );

      category?.classList.toggle("is-locked", locked);

      if (button) {
        button.setAttribute("aria-pressed", String(locked));
        button.textContent = locked ? "Locked" : "Unlock";
      }
    });
  }

  function activateTab(tabKey, focusTab = false) {
    const targetTab = document.getElementById(`tab-${tabKey}`);
    const targetPanel = document.getElementById(`panel-${tabKey}`);

    if (!targetTab || !targetPanel) return;

    dom.tabs.forEach((tab) => {
      const active = tab === targetTab;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", String(active));
      tab.tabIndex = active ? 0 : -1;
    });

    dom.panels.forEach((panel) => {
      const active = panel === targetPanel;
      panel.classList.toggle("is-active", active);
      panel.hidden = !active;
    });

    state.activeTab = tabKey;
    localStorage.setItem(STORAGE_KEYS.activeTab, tabKey);

    if (focusTab) targetTab.focus();
  }

  function handleTabKeydown(event) {
    const currentIndex = dom.tabs.indexOf(event.currentTarget);
    if (currentIndex < 0) return;

    let nextIndex = currentIndex;

    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        nextIndex = (currentIndex + 1) % dom.tabs.length;
        break;
      case "ArrowLeft":
      case "ArrowUp":
        nextIndex = (currentIndex - 1 + dom.tabs.length) % dom.tabs.length;
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = dom.tabs.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    activateTab(dom.tabs[nextIndex].dataset.tabKey, true);
  }

  function openModal(modal) {
    if (!modal) return;

    state.lastFocusedElement = document.activeElement;
    modal.hidden = false;
    document.body.style.overflow = "hidden";

    const focusable = getFocusableElements(modal);
    focusable[0]?.focus();
  }

  function closeModal(modal) {
    if (!modal || modal.hidden) return;

    modal.hidden = true;
    document.body.style.overflow = "";

    if (
      state.lastFocusedElement &&
      typeof state.lastFocusedElement.focus === "function"
    ) {
      state.lastFocusedElement.focus();
    }
  }

  function getFocusableElements(container) {
    return [
      ...container.querySelectorAll(
        'button:not(:disabled), [href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])',
      ),
    ].filter((element) => !element.hidden);
  }

  function trapModalFocus(event) {
    if (event.key !== "Tab") return;

    const openModalElement = [
      dom.historyModal,
      dom.clearConfirmationModal,
    ].find((modal) => modal && !modal.hidden);

    if (!openModalElement) return;

    const focusable = getFocusableElements(openModalElement);
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable.at(-1);

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function showToast(message, type = "info") {
    const toast = document.createElement("div");
    toast.className = `toast is-${type}`;
    toast.textContent = message;

    dom.toastRegion.appendChild(toast);

    window.setTimeout(() => {
      toast.classList.add("is-leaving");
      window.setTimeout(() => toast.remove(), 200);
    }, 3200);
  }

  function setButtonLoading(button, loading, loadingText = "Working...") {
    if (!button) return;

    if (loading) {
      button.dataset.originalText = button.textContent;
      button.textContent = loadingText;
      button.disabled = true;
      button.classList.add("is-loading");
      return;
    }

    button.textContent = button.dataset.originalText || button.textContent;
    button.disabled = false;
    button.classList.remove("is-loading");
    delete button.dataset.originalText;
  }

  function persistFormState() {
    try {
      localStorage.setItem(
        STORAGE_KEYS.formState,
        JSON.stringify(getAllValues()),
      );
    } catch {
      // Persistence failure should not stop the generator.
    }
  }

  function restoreFormState() {
    try {
      const stored = JSON.parse(
        localStorage.getItem(STORAGE_KEYS.formState) || "null",
      );

      if (!stored || typeof stored !== "object") return;

      Object.entries(stored).forEach(([key, value]) => {
        if (key in CONTROL_CATEGORY) {
          setControlValue(key, value);
        }
      });
    } catch {
      // Ignore damaged local state.
    }
  }

  function persistLocks() {
    try {
      localStorage.setItem(
        STORAGE_KEYS.locks,
        JSON.stringify([...state.locks]),
      );
    } catch {
      // Persistence failure should not stop the generator.
    }
  }

  function restoreLocks() {
    try {
      const stored = JSON.parse(
        localStorage.getItem(STORAGE_KEYS.locks) || "[]",
      );

      if (Array.isArray(stored)) {
        state.locks = new Set(
          stored.filter((key) => CATEGORY_KEYS.includes(key)),
        );
      }
    } catch {
      state.locks = new Set();
    }
  }

  function updatePresetDescription() {
    const preset = PRESETS[dom.presetSelect.value];

    dom.presetDescription.textContent = preset
      ? preset.purpose
      : "Load a ready-made creative direction, then customize it.";
  }

  function handleFormChange(event) {
    const target = event.target;

    if (
      !(target instanceof HTMLInputElement) &&
      !(target instanceof HTMLSelectElement)
    ) {
      return;
    }

    if (target.type === "checkbox") {
      handleChipChange(event);
      return;
    }

    if (target.id === "groupFormat") {
      reconcileCharacterSetup();
    }

    if (target.id === "mainTheme") {
      reconcileThemeGear();
    }

    if (target.id === "jerseyNumber") {
      target.value = target.value.replace(/[^A-Za-z0-9]/g, "").slice(0, 3);
    }

    markOutputOutdated();
    persistFormState();
  }

  function bindEvents() {
    dom.tabs.forEach((tab) => {
      tab.addEventListener("click", () => activateTab(tab.dataset.tabKey));
      tab.addEventListener("keydown", handleTabKeydown);
    });

    dom.presetSelect.addEventListener("change", updatePresetDescription);
    dom.applyPresetBtn.addEventListener("click", applyPreset);

    dom.generatePromptBtn.addEventListener("click", generatePrompt);
    dom.randomizeAllBtn.addEventListener("click", randomizeAll);
    dom.clearAllBtn.addEventListener("click", () =>
      openModal(dom.clearConfirmationModal),
    );

    dom.savePromptBtn.addEventListener("click", savePrompt);
    dom.saveOutputBtn.addEventListener("click", savePrompt);

    dom.copyPromptBtn.addEventListener("click", () =>
      copyText(state.generatedPrompt, "Prompt copied."),
    );

    dom.generateVariationsBtn.addEventListener("click", generateVariations);

    dom.openHistoryBtn.addEventListener("click", () => {
      renderHistory();
      openModal(dom.historyModal);
    });

    dom.closeHistoryModalBtn.addEventListener("click", () =>
      closeModal(dom.historyModal),
    );

    dom.clearHistoryBtn.addEventListener("click", clearHistory);

    dom.confirmClearAllBtn.addEventListener("click", () =>
      resetGenerator({ preserveCustomText: false }),
    );

    dom.clearSelectionsOnlyBtn.addEventListener("click", () =>
      resetGenerator({ preserveCustomText: true }),
    );

    document.addEventListener("change", handleFormChange);
    document.addEventListener("input", (event) => {
      const target = event.target;

      if (target instanceof HTMLInputElement && target.type === "text") {
        if (target.id === "jerseyNumber") {
          target.value = target.value.replace(/[^A-Za-z0-9]/g, "").slice(0, 3);
        }

        markOutputOutdated();
        persistFormState();
      }
    });

    document.addEventListener("click", (event) => {
      const lockButton = event.target.closest("[data-lock-category]");
      if (lockButton) {
        toggleLock(lockButton.dataset.lockCategory);
        return;
      }

      const randomizeButton = event.target.closest("[data-randomize-category]");
      if (randomizeButton) {
        randomizeCategory(randomizeButton.dataset.randomizeCategory);
        return;
      }

      const clearButton = event.target.closest("[data-clear-category]");
      if (clearButton) {
        clearCategory(clearButton.dataset.clearCategory);
        return;
      }

      const closeButton = event.target.closest("[data-close-modal]");
      if (closeButton) {
        const modal = document.getElementById(closeButton.dataset.closeModal);
        closeModal(modal);
        return;
      }

      const historyButton = event.target.closest("[data-history-action]");
      if (historyButton) {
        handleHistoryAction(
          historyButton.dataset.historyAction,
          historyButton.dataset.historyId,
        );
        return;
      }

      const copyVariation = event.target.closest("[data-copy-variation]");
      if (copyVariation) {
        const number = Number(copyVariation.dataset.copyVariation);
        copyText(state.variations[number - 1], `Variation ${number} copied.`);
        return;
      }

      const useVariationButton = event.target.closest("[data-use-variation]");
      if (useVariationButton) {
        useVariation(Number(useVariationButton.dataset.useVariation));
      }
    });

    document.addEventListener("keydown", (event) => {
      trapModalFocus(event);

      if (event.key === "Escape") {
        if (!dom.historyModal.hidden) {
          closeModal(dom.historyModal);
        } else if (!dom.clearConfirmationModal.hidden) {
          closeModal(dom.clearConfirmationModal);
        }
      }
    });
  }

  function initialize() {
    cacheDom();
    restoreFormState();
    restoreLocks();

    const savedTab = localStorage.getItem(STORAGE_KEYS.activeTab);
    state.activeTab = dom.tabs.some((tab) => tab.dataset.tabKey === savedTab)
      ? savedTab
      : "character";

    enforcePermanentRules();
    renderLocks();
    activateTab(state.activeTab);
    renderOutput();
    renderVariations();
    renderHistory();
    updatePresetDescription();
    bindEvents();
  }

  document.addEventListener("DOMContentLoaded", initialize);
})();
