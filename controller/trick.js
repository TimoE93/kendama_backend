const trick_schema = require('../schema/trick');

async function get_all_tricks(req, res){
    let all_tricks = await trick_schema.find({},{"_id": 0, "__v": 0});
    try {
        return all_tricks;
    } catch(err){
        return err;
    }
}

exports.get_all_tricks = get_all_tricks;

async function get_all_tricks_till_difficulty(difficulty) {
    
    try {
        let tricks = await trick_schema.find({difficulty: {$lte: difficulty}}, {"_id": 0, "__v": 0})
        return tricks
    } catch(err){
        return err;
    }
}

exports.get_all_tricks_till_difficulty = get_all_tricks_till_difficulty;


async function add_trick(req, res){
    const trick = new trick_schema({name: req.body.name, difficulty: req.body.difficulty, onlyatstart: req.body.onlyatstart});
    const added_trick = await trick.save();

    try {
        return added_trick;
    } catch(err){
        return err;
    }
}

exports.add_trick = add_trick;