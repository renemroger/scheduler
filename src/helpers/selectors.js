export function getAppointmentsForDay(state, day) {
  let appointments = [];
  for (const d in state.days) {

    if (state.days[d].name === day) {
      appointments = state.days[d].appointments;
    }
  }
  const objApp = appointments.map(app => {
    return state.appointments[app];
  });

  return objApp;
}

export function getInterview(state, interview) {

  let interviewId = '';
  if (interview) {
    interviewId = interview.interviewer;
  }
  if (state.interviewers[interviewId]) {
    return {
      student: interview.student,
      interviewer: { ...state.interviewers[interviewId] }
    }
  }

  return null;
}

export function getAppointmentsByDay(state, day) {
  let listOfInterviewers = [];
  for (const d in state.days) {
    if (state.days[d].name === day) {
      listOfInterviewers = state.days[d].interviewers;
    }
  }
  const objApp = listOfInterviewers.map(interviewer => {
    return state.interviewers[interviewer];
  });

  return objApp;


}