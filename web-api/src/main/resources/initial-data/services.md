Services in `src/js/services` allow sharing code between controllers.

  - `login-service.js` implements authentication with server and provides a request-interceptor
     that automatically adds authentication headers to API calls.
  - `messaging-service.js` implements support for sending and receiving STOMP-messages, allowing
    easy communication from server to clients.
  - `post-service.js` handles saving, deleting and retrieving posts. It also uses messagingService
    to subscribe to post notifications from server, allowing UI to be updated in real time when
    new messages are posted.
