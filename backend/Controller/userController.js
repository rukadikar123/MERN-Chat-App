export const getCurrentUser=async(req,res)=>{
    try {
        const user=req.user
        res.status(200).json({
            success:true,
            user
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:`Error: ${error.message}`
        })
    }
}