
const markTokenFromRequest = (req, res, next) => {
    if(req.get('authorization')){
        req.token = req.get('authorization').substring(7);
    }
    next();
};

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
  
const errorHandler = (error, request, response, next) => {
    console.log(error.name);

    if(error.name === 'JsonWebTokenError'){
        return response.status(401).json({error: 'Invalid JWT Token'});
    }
    else if (error.name === 'CastError' && error.kind === 'ObjectId') {
        return response.status(400).send({ error: 'malformatted id' });
    }
    else if (error.name === 'ValidationError' || error.name === 'TooShortInput') {
        return response.status(400).json({ error: error.message });
    }
    else if(error.name === 'MissingUserInput'){
        return response.status(422).json( { error: error.message } );
    }

    next(error)
}

module.exports = {
    unknownEndpoint,
    errorHandler,
    markTokenFromRequest
}