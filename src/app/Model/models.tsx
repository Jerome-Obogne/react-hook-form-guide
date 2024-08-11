import { z } from "zod";



const AffiliateModelDetails = z.object({
    isCheck: z.boolean(),
    days:z.string(),
    dateFrom: z.string(),
    dateTo:z.string()

})
const AffiliateModel= z.object({

    hospitalName: z.string(),
    hospitalAddr: z.string(),
    schedDetails: z.array(AffiliateModelDetails),

});
export default  AffiliateModel

