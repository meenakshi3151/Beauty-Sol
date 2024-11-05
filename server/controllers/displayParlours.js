const db = require('../db');

const displayParlours = async (req, res) => {
    const { userpincode, userstreet, userstate, usercity } = req.body;
    console.log(req.body)
    try {
        const query = `SELECT * FROM beauty_parlour`;
        const [parlours] = await db.query(query);
        const sortedParlours = parlours.map(parlour => {
            let matchCount = 0;
            console.log(parlour)

            if (parlour.Pincode === userpincode) matchCount++;
            if (parlour.Street && userstreet && userstreet.toLowerCase() && parlour.Street.toLowerCase() === userstreet.toLowerCase()) matchCount++;
            if (parlour.State && userstate &&  userstate.toLowerCase() && parlour.State.toLowerCase() === userstate.toLowerCase()) matchCount++;
            if (parlour.City && usercity && usercity.toLowerCase() && parlour.City.toLowerCase() === usercity.toLowerCase()) matchCount++;

            return { ...parlour, matchCount };
        })
        .sort((a, b) => b.matchCount - a.matchCount);
       
        return res.status(200).json(sortedParlours);
    } catch (error) {
        console.error('Error fetching beauty parlours:', error);
        return res.status(500).send('An error occurred while retrieving beauty parlours');
    }
};

module.exports = { displayParlours };
