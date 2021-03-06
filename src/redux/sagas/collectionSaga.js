import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "SEARCH" actions
function* collectionSaga(action) {

  // yield console.log('======>collectionSaga', action.payload)
  try {
    const response = yield axios.get('/api/collection');
    // const response = yield axios.get('/api/search');
    // perform put to return data from server    
    yield put({type: 'SET_COLLECTION', payload: response.data});
  } catch (error) {
      console.log('Error with Collection get', error);
  }
}

function* comCollectionSaga(action) {

  // yield console.log('======>collectionSaga', action.payload)
  try {
    const response = yield axios.get('/api/community/collection', {params: {search: action.payload}});
    // const response = yield axios.get('/api/search');
    // perform put to return data from server    
    yield put({type: 'SET_COLLECTION', payload: response.data});
  } catch (error) {
      console.log('Error with Collection get', error);
  }
}

function* removeFromCollectionSaga(action) {
  // yield console.log(`removing book_id: ${action.payload} from collection`)
  try {
    yield axios.delete('/api/collection/' + action.payload)
    yield put({type: 'FETCH_COLLECTION'});
  } catch (error) {
    console.log('Error deleting from collection', error);
  }
}

function* markCompleteSaga(action) {
  // yield console.log('markComplete:', action.payload)
  try {
    yield axios.put('/api/collection/complete/' + action.payload);
    yield put({type: 'FETCH_COLLECTION'});
  } catch (error) {
    console.log('Error marking book as complete');
  }
}

function* startOverSaga(action) {
  // yield console.log('markComplete:', action.payload)
  try {
    yield axios.put('/api/collection/startover/' + action.payload);
    yield put({type: 'FETCH_COLLECTION'});
  } catch (error) {
    console.log('Error marking book as not complete');
  }
}


function* searchSaga() {
  yield takeLatest('FETCH_COLLECTION', collectionSaga);
  yield takeLatest('REMOVE_FROM_COLLECTION', removeFromCollectionSaga);
  yield takeLatest('MARK_COMPLETE', markCompleteSaga);
  yield takeLatest('START_OVER', startOverSaga);
  yield takeLatest('FETCH_COM_COLLECTION', comCollectionSaga)
}

export default searchSaga;
