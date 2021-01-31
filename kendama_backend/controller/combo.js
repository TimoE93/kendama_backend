const { get_all_tricks_till_difficulty } = require('./trick');

async function create_combo(req,res) {
   
    try {
        const difficulty = req.query.difficulty;
        const all_tricks = await get_all_tricks_till_difficulty(difficulty);
        const starter_tricks = [];
        const combo = [];
        let number_of_tricks = req.query.number;
        
        all_tricks.forEach( value => {
            if ( value.onlyatstart == true ) {
                starter_tricks.push(value);
            }
        })

        const starting_trick = get_starter_trick(starter_tricks);
        if ( starting_trick !== null ) {
            combo.push(starting_trick);
            --number_of_tricks;
        }

        shuffle(all_tricks);
        
        let tricks_for_combo = add_tricks_to_combo(all_tricks, number_of_tricks);
        let combo_complet = combo.concat(tricks_for_combo);
        
        res.json(combo_complet);
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

function add_tricks_to_combo( all_tricks, number_of_tricks ) {
    let combo = [];
    for( let i = 0; i < number_of_tricks; i++ ) {
        let trick = null;
        let same_trick_as_before = false; 
        do {
          trick = all_tricks[Math.floor(Math.random()*all_tricks.length)];
          if ( combo.length > 0 ) {
            if ( combo[i-1].name == trick.name ) {
                same_trick_as_before = true;
              } else {
                same_trick_as_before = false;
              }
          }
        }
        while(trick.onlyatstart === true || same_trick_as_before )

        combo.push(trick);
    }

    return combo;
}

exports.create_combo = create_combo;