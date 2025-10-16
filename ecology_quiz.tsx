import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, RotateCcw, Award } from 'lucide-react';

const quizData = [
  { q: "Which of these is not a characteristic of fitness?", opts: ["Fitness is environment-specific", "Fitness is species-specific", "Higher reproductive rate means higher fitness", "Fitness should be measured across several generations"], ans: 2 },
  { q: "Who amongst these is considered the father of Biogeography?", opts: ["Theophrastus", "Linnaeus", "Malthus", "Humboldt"], ans: 3 },
  { q: "In the Greek word root of Ecology, Oikos refers to", opts: ["household", "preservation", "environment", "study"], ans: 0 },
  { q: "In the Greek word root of Ecology, logos refers to", opts: ["household", "preservation", "environment", "study"], ans: 3 },
  { q: "Which of these is not a step in natural selection?", opts: ["variation", "underpopulation", "struggle for existence", "survival of the fittest"], ans: 1 },
  { q: "Ecology is the scientific study of ___ that determine the distribution and abundance of organisms.", opts: ["statics", "interactions", "dynamics", "habitat"], ans: 1 },
  { q: "Which of these is not a characteristic of fitness?", opts: ["Fitness is environment-specific", "Fitness is species-specific", "Fitness works on traits such as size and speed", "Fitness should be measured across several generations"], ans: 2 },
  { q: "Ecology is the scientific study of interactions among organisms and their ___", opts: ["habitat", "niche", "environment", "population"], ans: 2 },
  { q: "\"Enquiry into plants\" is a book written by", opts: ["Theophrastus", "Linnaeus", "Malthus", "Humboldt"], ans: 0 },
  { q: "Which of these is not a kind of selection", opts: ["directional", "stochastic", "disruptive", "stabilising"], ans: 1 },
  { q: "Hierarchy emerges almost inevitably through a wide variety of evolutionary processes, for the simple reason that hierarchical structures are..........", opts: ["perfect", "imperfect", "stable", "unstable"], ans: 2 },
  { q: "The hierarchical system was given by", opts: ["Simon", "Watson", "Hutchinson", "Humboldt"], ans: 0 },
  { q: "The emergent principle can be stated as", opts: ["Whole = sum of parts", "Whole < sum of parts", "Whole > sum of parts", "None of these"], ans: 2 },
  { q: "\"the diversity that exists within an ecosystem\" is", opts: ["alpha (α) biodiversity", "beta (β) biodiversity", "gamma (γ) biodiversity", "delta (δ) biodiversity"], ans: 0 },
  { q: "The mitochondrion is a / an", opts: ["Sub-cellular organelle", "Cell", "Tissue", "Organ"], ans: 0 },
  { q: "For more biodiversity, the level of disturbance should be", opts: ["less", "intermediate", "more", "none of these"], ans: 1 },
  { q: "There is more biodiversity in areas with", opts: ["less competition, less predation", "less competition, more predation", "more competition, more predation", "more competition, less predation"], ans: 2 },
  { q: "\"the diversity that exists among different geographies\" is", opts: ["alpha (α) biodiversity", "beta (β) biodiversity", "gamma (γ) biodiversity", "delta (δ) biodiversity"], ans: 2 },
  { q: "The laboratory approach to Ecology uses", opts: ["equations", "models", "observations", "experiments"], ans: 3 },
  { q: "\"groups of actually or potentially interbreeding natural populations, which are reproductively isolated from other such groups\" is a definition of", opts: ["cells", "species", "ecosystems", "biomes"], ans: 1 },
  { q: "I observe a monkey take a tick out of another monkey's head and eat it. In the social context, this behaviour would be called", opts: ["tick hunting", "auto grooming", "allo grooming", "foraging"], ans: 2 },
  { q: "The scientific study of animal behaviour is called", opts: ["behaviourism", "ecology", "ethology", "prey-predator dynamics"], ans: 2 },
  { q: "Hamilton's rule can be stated as", opts: ["rB < C", "rB > C", "rB = C", "rB + C = 0"], ans: 1 },
  { q: "Harmonious interactions occur where", opts: ["at least one participant is benefited", "at least one participant is unharmed", "both participants are benefitted", "both participants are unharmed"], ans: 3 },
  { q: "The interaction between exotic shrubs and trees through the action of seed predators is an example of", opts: ["infraspecific competition", "apparent competition", "disguised competition", "harmonious competition"], ans: 1 },
  { q: "An inventory of behaviours exhibited by an animal during a behaviour exercise is called", opts: ["ecogram", "ethogram", "behaviourogram", "animalogram"], ans: 1 },
  { q: "Trampling of grass due to the movement of animals is an example of", opts: ["mutualism", "amensalism", "commensalism", "protocooperation"], ans: 1 },
  { q: "I observe a bird take a tick out of another bird's head and eat it. In the social context, this behaviour would be called", opts: ["tick hunting", "auto grooming", "allo grooming", "foraging"], ans: 2 },
  { q: "Birds on giraffe are an example of", opts: ["colony", "commensalism", "protocooperation", "allelopathy"], ans: 2 },
  { q: "Egrets with buffaloes are an example of", opts: ["colony", "commensalism", "protocooperation", "allelopathy"], ans: 1 },
  { q: "If we all became vegetarians, we'll be able to support our large populations. This can be explained through", opts: ["10% rule", "1% rule", "trophic cascade", "biodiversity"], ans: 0 },
  { q: "Net primary productivity is given by", opts: ["APAR × LUE", "APAR + LUE", "APAR - LUE", "APAR / LUE"], ans: 0 },
  { q: "Trees → Birds → Parasites → Hyperparasites represents", opts: ["upright pyramid of numbers", "inverted pyramid of numbers", "spindle pyramid of numbers", "dumb-bell pyramid of numbers"], ans: 1 },
  { q: "Grass → Grasshopper → Frog → Snake → Hawk. As we move up the food chain,", opts: ["available energy decreases", "available energy increases", "available energy remains same", "available energy is zero everywhere"], ans: 0 },
  { q: "Grass → Grasshopper → Frog → Snake → Hawk. In this food chain,", opts: ["frog is producer", "frog is consumer and carnivore", "frog is consumer and herbivore", "frog is decomposer"], ans: 1 },
  { q: "Grass → Grasshopper → Frog → Snake → Hawk. In this food chain,", opts: ["more number of hawks than grasshoppers can be supported", "more number of grasshoppers than hawks can be supported", "equal number of hawks and grasshoppers can be supported", "none of these"], ans: 1 },
  { q: "At the compensation point,", opts: ["photosynthesis = respiration", "photosynthesis < respiration", "photosynthesis > respiration", "photosynthesis = 0"], ans: 0 },
  { q: "Glacial lakes are typical examples of", opts: ["eutrophic lakes", "hypereutrophic lakes", "oligotrophic lakes", "mesotrophic lakes"], ans: 2 },
  { q: "Grass → Grasshopper → Frog → Snake → Hawk. In this food chain,", opts: ["hawk is producer", "hawk is consumer and carnivore", "hawk is consumer and herbivore", "hawk is decomposer"], ans: 1 },
  { q: "Tree → Frugivorous birds → Hawk represents", opts: ["upright pyramid of numbers", "inverted pyramid of numbers", "spindle pyramid of numbers", "dumb-bell pyramid of numbers"], ans: 2 },
  { q: "In a pyramid of energy, energy", opts: ["decreases at each trophic level", "increases at each trophic level", "remains constant at all levels", "fluctuates randomly"], ans: 0 },
  { q: "Which one of these is a heterotroph?", opts: ["Plants", "Fungi", "Algae", "Cyanobacteria"], ans: 1 },
  { q: "A food web represents", opts: ["a single energy pathway", "multiple interconnected food chains", "only producer–consumer relationship", "nutrient cycling"], ans: 1 },
  { q: "In the nitrogen cycle, nitrogen fixation is carried out by", opts: ["fungi", "animals", "bacteria", "insects"], ans: 2 },
  { q: "In the carbon cycle, CO₂ is absorbed by plants during", opts: ["respiration", "photosynthesis", "decomposition", "combustion"], ans: 1 },
  { q: "Phosphorus cycle differs from other biogeochemical cycles as it", opts: ["has no gaseous phase", "has no sedimentary phase", "is the fastest cycle", "doesn't involve organisms"], ans: 0 },
  { q: "The decomposers in an ecosystem include", opts: ["only bacteria", "only fungi", "bacteria and fungi", "herbivores"], ans: 2 },
  { q: "The rate at which producers convert solar energy into chemical energy is called", opts: ["gross primary productivity", "net primary productivity", "secondary productivity", "energy efficiency"], ans: 0 },
  { q: "In an energy pyramid, the producers occupy", opts: ["the top level", "the second level", "the base", "no level"], ans: 2 },
  { q: "Which of these organisms is at the lowest trophic level?", opts: ["Rabbit", "Tiger", "Grass", "Frog"], ans: 2 },
  { q: "Biomass pyramid can be inverted in", opts: ["aquatic ecosystems", "forest ecosystems", "grasslands", "deserts"], ans: 0 },
  { q: "Oxygen cycle is closely linked with", opts: ["nitrogen cycle", "phosphorus cycle", "carbon cycle", "sulfur cycle"], ans: 2 },
  { q: "The largest reservoir of carbon on Earth is", opts: ["atmosphere", "oceans", "forests", "soil"], ans: 1 },
  { q: "Energy flow in an ecosystem is", opts: ["cyclic", "unidirectional", "multidirectional", "reversible"], ans: 1 },
  { q: "The 10% law of energy transfer was given by", opts: ["Lindeman", "Lotka", "Odum", "Haeckel"], ans: 0 },
  { q: "In the water cycle, transpiration is the process of", opts: ["water loss through leaves", "absorption of water", "condensation of vapor", "precipitation"], ans: 0 },
  { q: "Detritivores feed on", opts: ["dead organic matter", "living organisms", "both", "inorganic substances"], ans: 0 },
  { q: "The process of conversion of nitrates into nitrogen gas is called", opts: ["nitrification", "ammonification", "denitrification", "nitrogen fixation"], ans: 2 },
  { q: "The organisms that can fix atmospheric nitrogen are", opts: ["Rhizobium", "Azotobacter", "Nostoc", "All of these"], ans: 3 },
  { q: "Secondary succession occurs on", opts: ["bare rock", "newly formed volcanic island", "abandoned farmland", "glacier moraine"], ans: 2 },
  { q: "Primary succession begins on", opts: ["fertile soil", "deforested area", "newly exposed surface", "old farmland"], ans: 2 },
  { q: "The climax community is", opts: ["the first community in succession", "unstable", "in equilibrium with the environment", "always made of grasses"], ans: 2 },
  { q: "The first organisms to colonize a bare area are called", opts: ["climax species", "keystone species", "pioneer species", "invasive species"], ans: 2 },
  { q: "The sequence of communities replacing one another in an ecosystem is called", opts: ["food chain", "ecological succession", "pyramid of numbers", "trophic cascade"], ans: 1 },
  { q: "The hydrosere succession occurs in", opts: ["water bodies", "rocks", "sand dunes", "deserts"], ans: 0 },
  { q: "The xerosere succession occurs in", opts: ["aquatic habitats", "dry habitats", "forests", "wetlands"], ans: 1 },
  { q: "A stable community that shows equilibrium with the environment is called", opts: ["pioneer community", "climax community", "transient community", "secondary community"], ans: 1 },
  { q: "In secondary succession, soil is", opts: ["absent", "newly formed", "already present", "sterile"], ans: 2 },
  { q: "The first stage in hydrosere succession is", opts: ["phytoplankton stage", "submerged stage", "floating stage", "reed-swamp stage"], ans: 0 },
  { q: "Lichens are important in primary succession because they", opts: ["fix nitrogen", "decompose dead matter", "secrete acids to weather rocks", "provide shade"], ans: 2 },
  { q: "Which succession starts in an area where no life existed before?", opts: ["Primary", "Secondary", "Tertiary", "Climax"], ans: 0 },
  { q: "In xerosere succession, the first colonizers are usually", opts: ["mosses", "algae", "lichens", "grasses"], ans: 2 },
  { q: "The process by which a pond is converted into land due to succession is called", opts: ["hydrarch succession", "xerosere", "lithosere", "eutrophication"], ans: 0 },
  { q: "Ecological succession always leads to", opts: ["decrease in biomass", "increase in biodiversity", "disappearance of soil", "decrease in stability"], ans: 1 },
  { q: "A climax community dominated by grasses is called", opts: ["forest", "desert", "grassland", "tundra"], ans: 2 },
  { q: "Fire disturbance usually leads to", opts: ["secondary succession", "primary succession", "destruction of soil", "loss of all species"], ans: 0 },
  { q: "In ecological succession, species diversity", opts: ["decreases with time", "increases with time", "remains constant", "fluctuates randomly"], ans: 1 },
  { q: "In an ecosystem, self-regulation and stability are features of", opts: ["pioneer community", "climax community", "seral community", "disturbed community"], ans: 1 },
  { q: "Secondary succession is faster than primary succession because", opts: ["soil is already present", "climate is more favorable", "pioneer species grow quickly", "human activity helps"], ans: 0 },
  { q: "In succession, the final stable community is known as", opts: ["seral stage", "climax community", "pioneer stage", "transient community"], ans: 1 },
  { q: "Which of these is an abiotic factor of an ecosystem?", opts: ["Light", "Animals", "Fungi", "Bacteria"], ans: 0 },
  { q: "Which is a biotic component of an ecosystem?", opts: ["Soil", "Water", "Microorganisms", "Temperature"], ans: 2 },
  { q: "The major source of energy for the ecosystem is", opts: ["the Sun", "producers", "decomposers", "chemical reactions"], ans: 0 },
  { q: "The main decomposers in an ecosystem are", opts: ["bacteria and fungi", "producers", "herbivores", "carnivores"], ans: 0 },
  { q: "Which one of these ecosystems has the highest productivity?", opts: ["Tropical rainforest", "Desert", "Tundra", "Open ocean"], ans: 0 },
  { q: "Which ecosystem has the least productivity?", opts: ["Tundra", "Tropical forest", "Coral reef", "Grassland"], ans: 0 },
  { q: "In an aquatic ecosystem, the zone where light does not penetrate is called", opts: ["photic zone", "aphotic zone", "benthic zone", "pelagic zone"], ans: 1 },
  { q: "The biotic community together with its physical environment constitutes an", opts: ["ecosystem", "biosphere", "population", "species"], ans: 0 },
  { q: "Which among these is an example of an artificial ecosystem?", opts: ["Aquarium", "Forest", "Pond", "Desert"], ans: 0 },
  { q: "The ecosystem with maximum biodiversity is", opts: ["tropical rainforest", "desert", "tundra", "grassland"], ans: 0 },
  { q: "The non-living components of the ecosystem are called", opts: ["abiotic components", "biotic components", "organic components", "ecological components"], ans: 0 },
  { q: "The living components of an ecosystem are called", opts: ["biotic components", "abiotic components", "non-living components", "physical factors"], ans: 0 },
  { q: "Which process returns carbon to the atmosphere?", opts: ["Photosynthesis", "Respiration", "Absorption", "Fixation"], ans: 1 },
  { q: "The organisms that feed at all trophic levels are called", opts: ["omnivores", "herbivores", "carnivores", "decomposers"], ans: 0 },
  { q: "Which one of these is an example of a detritivore?", opts: ["Earthworm", "Lion", "Cow", "Grasshopper"], ans: 0 },
  { q: "In an ecosystem, energy flow is governed by", opts: ["the laws of thermodynamics", "Mendel's laws", "Hardy-Weinberg principle", "Newton's laws"], ans: 0 },
  { q: "The second law of thermodynamics states that", opts: ["energy is lost as heat in energy transfers", "energy can be created", "energy cannot change form", "total energy increases"], ans: 0 },
  { q: "The study of energy relationships and transfers in ecosystems is called", opts: ["bioenergetics", "thermodynamics", "physiology", "photobiology"], ans: 0 },
  { q: "The organisms that feed directly on producers are called", opts: ["primary consumers", "secondary consumers", "tertiary consumers", "decomposers"], ans: 0 },
  { q: "Which one of the following is a secondary consumer?", opts: ["Frog", "Grass", "Deer", "Rabbit"], ans: 0 },
  { q: "Which of the following statements about energy flow is true?", opts: ["Energy flows in a one-way direction", "Energy cycles", "Energy increases", "Energy is constant"], ans: 0 },
  { q: "The percentage of energy transferred from one trophic level to another is about", opts: ["10%", "25%", "50%", "90%"], ans: 0 },
  { q: "An inverted pyramid of biomass is found in", opts: ["aquatic ecosystems", "forests", "grasslands", "deserts"], ans: 0 },
  { q: "The pyramid of numbers in a grassland ecosystem is usually", opts: ["upright", "inverted", "spindle-shaped", "dumb-bell shaped"], ans: 0 },
  { q: "Which of these statements about decomposers is true?", opts: ["They recycle nutrients", "They photosynthesize", "They eat only plants", "They form the top of the pyramid"], ans: 0 },
  { q: "The largest ecosystem on Earth is", opts: ["ocean", "forest", "desert", "grassland"], ans: 0 },
  { q: "Which of the following cycles involves nitrogen-fixing bacteria?", opts: ["Nitrogen cycle", "Carbon cycle", "Phosphorus cycle", "Sulfur cycle"], ans: 0 },
  { q: "During ecological succession, the number of species", opts: ["increases", "decreases", "remains the same", "fluctuates"], ans: 0 },
  { q: "Which factor is responsible for primary succession?", opts: ["Volcanic eruption", "Fire", "Deforestation", "Abandoned farmland"], ans: 0 },
  { q: "The biogeochemical cycle without a gaseous phase is", opts: ["Phosphorus cycle", "Nitrogen cycle", "Carbon cycle", "Oxygen cycle"], ans: 0 },
  { q: "The process of breaking down dead organic matter into simpler compounds is called", opts: ["decomposition", "photosynthesis", "respiration", "nitrification"], ans: 0 },
  { q: "The water cycle involves which process?", opts: ["Evaporation", "Condensation", "Precipitation", "All of these"], ans: 3 },
  { q: "Which of the following is a producer?", opts: ["Grass", "Rabbit", "Snake", "Hawk"], ans: 0 },
  { q: "The transfer of energy from one trophic level to another follows", opts: ["the 10% law", "the law of inertia", "Hardy-Weinberg equilibrium", "competitive exclusion principle"], ans: 0 },
  { q: "The base of the ecological pyramid always represents", opts: ["producers", "herbivores", "carnivores", "decomposers"], ans: 0 },
  { q: "The gaseous nutrient cycle is that of", opts: ["nitrogen", "phosphorus", "sulfur", "calcium"], ans: 0 },
  { q: "The sedimentary nutrient cycle is that of", opts: ["phosphorus", "nitrogen", "oxygen", "carbon"], ans: 0 },
  { q: "The accumulation of non-biodegradable substances in the food chain is called", opts: ["biomagnification", "bioremediation", "eutrophication", "bioaccumulation"], ans: 0 },
  { q: "The process by which green plants prepare their food is", opts: ["photosynthesis", "respiration", "transpiration", "chemosynthesis"], ans: 0 },
  { q: "The sum total of all ecosystems on Earth is called", opts: ["biosphere", "atmosphere", "lithosphere", "hydrosphere"], ans: 0 }
];

export default function EcologyQuiz() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState([]);

  const handleSelect = (idx) => {
    if (selected === null) {
      setSelected(idx);
      const isCorrect = idx === quizData[current].ans;
      if (isCorrect) setScore(score + 1);
      setAnswered([...answered, { q: current, correct: isCorrect }]);
    }
  };

  const handleNext = () => {
    if (current < quizData.length - 1) {
      setCurrent(current + 1);
      setSelected(null);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setCurrent(0);
    setSelected(null);
    setShowResult(false);
    setScore(0);
    setAnswered([]);
  };

  if (showResult) {
    const percentage = ((score / quizData.length) * 100).toFixed(1);
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <Award className="w-20 h-20 mx-auto text-emerald-500 mb-4" />
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Quiz Complete!</h2>
          <p className="text-gray-600 mb-6">Here's how you did:</p>
          <div className="bg-gradient-to-r from-emerald-100 to-teal-100 rounded-xl p-6 mb-6">
            <div className="text-5xl font-bold text-emerald-600 mb-2">{percentage}%</div>
            <div className="text-lg text-gray-700">{score} out of {quizData.length} correct</div>
          </div>
          <button
            onClick={handleRestart}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-lg font-medium transition flex items-center gap-2 mx-auto"
          >
            <RotateCcw className="w-5 h-5" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 p-4">
      <div className="max-w-3xl mx-auto py-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Ecology Quiz</h1>
            <div className="text-sm font-medium text-gray-600 bg-gray-100 px-4 py-2 rounded-full">
              Question {current + 1} / {quizData.length}
            </div>
          </div>

          <div className="mb-4">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-300"
                style={{ width: `${((current + 1) / quizData.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl text-gray-800 font-medium mb-6">{quizData[current].q}</h2>
            <div className="space-y-3">
              {quizData[current].opts.map((opt, idx) => {
                const isCorrect = idx === quizData[current].ans;
                const isSelected = selected === idx;
                let bgColor = "bg-gray-50 hover:bg-gray-100";
                let borderColor = "border-gray-200";
                let icon = null;

                if (selected !== null) {
                  if (isCorrect) {
                    bgColor = "bg-emerald-50";
                    borderColor = "border-emerald-500";
                    icon = <CheckCircle className="w-5 h-5 text-emerald-500" />;
                  } else if (isSelected) {
                    bgColor = "bg-red-50";
                    borderColor = "border-red-500";
                    icon = <XCircle className="w-5 h-5 text-red-500" />;
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelect(idx)}
                    disabled={selected !== null}
                    className={`w-full text-left p-4 rounded-xl border-2 ${bgColor} ${borderColor} transition flex items-center justify-between ${
                      selected === null ? 'cursor-pointer' : 'cursor-default'
                    }`}
                  >
                    <span className="text-gray-800">{opt}</span>
                    {icon}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Score: {score} / {current + (selected !== null ? 1 : 0)}
            </div>
            {selected !== null && (
              <button
                onClick={handleNext}
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-lg font-medium transition"
              >
                {current === quizData.length - 1 ? 'Finish' : 'Next Question'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}