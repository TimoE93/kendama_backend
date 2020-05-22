const { get_all_tricks } = require('./trick');

async function create_combo(req,res) {
    const all_tricks = await get_all_tricks();
    try {
        shuffle(all_tricks);
        const combo = [];
        for( let i = 0; i < 5; i++ ) {
            combo.push(all_tricks[Math.floor(Math.random()*all_tricks.length)]);
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