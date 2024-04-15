import PlantModel from "./models/PlantModel";
import { SqlPlantRespository } from "./repositories/SqlPlantRepository";

const sqlPlantRepository = new SqlPlantRespository(PlantModel);
