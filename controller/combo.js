const { get_all_tricks } = require('./trick');

async function create_combo(req,res) {
    const all_tricks = await get_all_tricks();
    try {
        const difficulty = req.body.difficulty;
        const tricks_difficulty = [];
        
        all_tricks.forEach( value => {
            if ( value.difficulty <= difficulty ) {
                tricks_difficulty.push(value);
            }
        })

        shuffle(tricks_difficulty);
        const combo = [];
        for( let i = 0; i < 5; i++ ) {
            combo.push(tricks_difficulty[Math.floor(Math.random()*tricks_difficulty.length)]);
        }
        res.json(combo);
      } catch(err){
          res.json({'Message': err});
      }
}

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
    return array;
}

exports.create_combo = create_combo;