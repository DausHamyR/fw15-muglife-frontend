const checkCredentials = (token, res, redirectTo)=> {
  
  if (!token) {
    res.setHeader('location', redirectTo);
    res.statusCode = 302;
    res.end();
    return {
      props: {}
    };
  }
};

export default checkCredentials;