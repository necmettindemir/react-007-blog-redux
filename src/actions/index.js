import jsonPlaceholder from '../apis/jsonPlaceholder';
import _ from 'lodash';


export const fetchPosts = () => async (dispatch) =>  {

    const resp = await jsonPlaceholder.get('/posts');

    dispatch(
        { 
            type:'FETCH_POSTS',
            payload: resp.data
        }
    );
}


/* export const fetchUser = (Id) => async (dispatch) =>  {

    
    const resp = await jsonPlaceholder.get('/users/' + Id);

    dispatch(
        { 
            type:'FETCH_USER',
            payload: resp.data
        }
    );
} */

//-- OK
/* export const fetchUser = function(Id) {

    return async function(dispatch) {        
        
        const resp = await jsonPlaceholder.get('/users/' + Id);

        dispatch({ type:'FETCH_USER',payload: resp.data});

    };
}; */

//-- solution -- not to repeat APIcall withuserID ---- v2



export const fetchPostsAndUsers = () => async (dispatch, getState) => {

    await dispatch(fetchPosts());


/* //------------- v1 ----
    const userIds = _.uniq( _.map( getState().posts, 'userId' ));
    
    console.log('userIds',userIds);

    //await Promise.all(userIds.map(id=>dispatch(fetchUser(id))));

    userIds.forEach(id => dispatch(fetchUser(id)));

//------------- /v1 ----
 */

//------------- v2 ----

    _.chain(getState().posts)
     .map('userId')
     .uniq()
     .forEach(id=> dispatch(fetchUser(id)))
     .value();

//------------- /v2 ----


};

export const fetchUser = (Id) => async (dispatch) =>  {

    
    const resp = await jsonPlaceholder.get('/users/' + Id);

    dispatch(
        { 
            type:'FETCH_USER',
            payload: resp.data
        }
    );
}

//-- /solution -- not to repeat APIcall withuserID ---- v2

/* 
//-- solution -- not to repeat APIcall withuserID ---- v1 

export const fetchUser = function(Id) {

    return  function(dispatch) {        
        
       //  const resp = await jsonPlaceholder.get('/users/' + Id);
       //  dispatch({ type:'FETCH_USER',payload: resp.data});

        _fetchUser(Id, dispatch); //--v1

    };
};


const _fetchUser = _.memoize(  async (Id, dispatch) => {
        
    const resp = await jsonPlaceholder.get('/users/' + Id);

    dispatch({ type:'FETCH_USER',payload: resp.data});

} );
//-- /solution -- not to repeat APIcall withuserID ---- /v1 
 */


/* 
//-- v1 - expected approach --- but wrong ---
export const fetchPosts = async () => {    

    const resp = await jsonPlaceholder.get('/posts');

    return {
        type: 'FETCH_POSTS',
        payload: resp
    }

}
//-- v1/ - expected approach --- but wrong ---
 */


/* //-- v2 - expected approach --- but wrong ---
export const fetchPosts =  () => {    

    const resp =  jsonPlaceholder.get('/posts');

    return {
        type: 'FETCH_POSTS',
        payload: resp
    }

}
//-- v2/ - expected approach --- but wrong --- 
*/