import {z} from "zod"

const valueSchema = z.object({
    N: z.number().min(1, "Nitrogen (N) must be greater than 0").max(200, "Nitrogen (N) must be less than or equal to 200"),
    P: z.number().min(1, "Phosphorus (P) must be greater than 0").max(200, "Phosphorus (P) must be less than or equal to 200"),
    K: z.number().min(1, "Potassium (K) must be greater than 0").max(200, "Potassium (K) must be less than or equal to 200"),
    pH: z.number().min(1, "pH must be greater than 0").max(14, "pH must be less than or equal to 14"),
    rainfall: z.number().min(1, "Rainfall must be greater than 0").max(500, "Rainfall must be less than or equal to 500"), 
})
export default valueSchema;