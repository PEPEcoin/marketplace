import { takeEvery, call, put } from 'redux-saga/effects'
import {
  FETCH_ADDRESS_PARCELS_REQUEST,
  FETCH_ADDRESS_PARCELS_SUCCESS,
  FETCH_ADDRESS_PARCELS_FAILURE
} from './actions'

import { FETCH_PARCELS_SUCCESS } from 'modules/parcels/actions'

import api from 'lib/api'

export default function* saga() {
  yield takeEvery(FETCH_ADDRESS_PARCELS_REQUEST, handleAddressParcelsRequest)
  yield takeEvery(FETCH_ADDRESS_PARCELS_SUCCESS, handleAddressParcelsSuccess)
}

function* handleAddressParcelsRequest(action) {
  try {
    const { address } = action
    const parcels = yield call(() => api.fetchAddressParcels(address))

    yield put({
      type: FETCH_ADDRESS_PARCELS_SUCCESS,
      address,
      parcels
    })
  } catch (error) {
    yield put({
      type: FETCH_ADDRESS_PARCELS_FAILURE,
      error: error.message
    })
  }
}

function* handleAddressParcelsSuccess(action) {
  yield put({
    type: FETCH_PARCELS_SUCCESS,
    parcels: action.parcels
  })
}
