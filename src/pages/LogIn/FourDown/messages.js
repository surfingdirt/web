const messages = (getText, getPlural) => (key) =>
  ({
    signIn: getText(
      'Sign in',
    ) /* Label for a link to the signIn page, or label for a button to actually signIn */,
    votingFor: getText(
      'Voting for:',
      '4 Down SignIn',
    ) /* Introduced the name of the video to vote for: */,
    explanations1: getText(
      'Because we only allow one vote per person, we need you to login or create an account.',
      '4 Down SignIn',
    ) /* Paragraph explaining why registering is necessary */,
    explanations2: getText(
      'You can login with Google or Facebook, or use an email and password:',
      '4 Down SignIn',
    ) /* Paragraph explaining how to register */,
    googleForm: getText(
      'If you would rather not create an account, you can cast your vote here:',
      '4 Down SignIn',
    ) /* Link to a Google Form page */,
  }[key]);

export default messages;
