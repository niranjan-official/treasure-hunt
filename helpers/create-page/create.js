const checkDataSufficiency = (gameData) => {
  const { instructions, qrData, questionsAnswers, basicData } = gameData;
  const { levels } = basicData;

  // check 1
  const numLevels = parseInt(levels, 10);
  if (isNaN(numLevels) || numLevels <= 0) {
    return {
      isValid: false,
      message: "The number of levels must be a positive integer.",
    };
  }
  //check 2
  if(!basicData.title || !basicData.venue){
    return {
        isValid: false,
        message: "The Game Title or the Venue is missing."
      };
  }
  //check 3
  if (qrData.length < numLevels || questionsAnswers.length < numLevels) {
    return {
      isValid: false,
      message: "The number of questions/answers and hints/qrData should be at least equal to the number of levels."
    };
  }

  //check 4
  if (
    instructions.some((inst) => !inst) ||
    qrData.some((item) => !item.hint || !item.qr) ||
    questionsAnswers.some((qa) => !qa.question || !qa.answer)
  ) {
    return {
      isValid: false,
      message: "All instructions, questions/answers, and hints/qrData must contain non-null values."
    };
  }

  // If all checks pass
  return {
    isValid: true,
    message: "All data is sufficient and valid."
  };
};

export { checkDataSufficiency };
