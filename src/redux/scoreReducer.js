export const scoreReducer = (state = null, action) => {
  const { payload, type } = action

  const Manager = {
    "@score/currentScore": () => payload,
    "@score/deleteCurrentScore": () => payload,
  }

  return Manager[type]
    ? Manager[type]()
    : state
}

export const setCurrentScore = (score) => {
  return {
    type: "@score/currentScore",
    payload: {
      ...score
    }
  }
}

export const deleteCurrentScore = () => {
  return {
    type: "@score/deleteCurrentScore",
    payload: null
  }
}