const trick_schema = require('./../schema/trick');

async function get_all_tricks(req, res){
    let all_tricks = await trick_schema.find();
    try {
        return all_tricks;
    } catch(err){
        return err;
    }
}

exports.get_all_tricks = get_all_tricks;

async function add_trick(req, res){
    const trick = new trick_schema({name: req.body.name});
    const added_trick = await trick.save();

    try {
        return added_trick;
    } catch(err){
        return err;
    }
}

exports.add_trick = add_trick;