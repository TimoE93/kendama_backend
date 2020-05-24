const { get_all_tricks } = require('./trick');

async function create_combo(req,res) {
    const all_tricks = await get_all_tricks();
    try {
        const difficulty = req.query.difficulty;
        const tricks_difficulty = [];
        const starter_tricks = [];
        const combo = [];
        let number_of_tricks = req.query.number;
        
        all_tricks.forEach( value => {
            if ( value.difficulty <= difficulty ) {
                tricks_difficulty.push(value);
            }
        })

        tricks_difficulty.forEach( value => {
            if ( value.onlyatstart == true ) {
                starter_tricks.push(value);
            }
        })

        const starting_trick = get_starter_trick(starter_tricks);
        if ( starting_trick !== null ) {
            combo.push(starting_trick);
            --number_of_tricks;
        }

        shuffle(tricks_difficulty);
        
        for( let i = 0; i < number_of_tricks; i++ ) {
            let trick = null;
            
            do {
              trick = tricks_difficulty[Math.floor(Math.random()*tricks_difficulty.length)];
            }
            while(trick.onlyatstart === true)

            combo.push(trick);
           
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

function get_starter_trick( starter_tricks) {
    if ( starter_tricks.length === 0 ) {
        return null;
    }

    const random_number = Math.floor(Math.random() * (starter_tricks.length * 5));
    if ( starter_tricks[random_number] ) {
        return starter_tricks[random_number] 
    }
    return null;
}

exports.create_combo = create_combo;