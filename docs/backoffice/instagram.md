# Backoffice — Instagram automation

> **Implementation status:** merged to GitLab master on 2026-11-13. The seeded Cargo rule remains disabled and in dry-run. This page documents the Backoffice/API capability, not live Meta delivery.

## Purpose

The Instagram area in Backoffice is the operational surface for Advertio's Meta webhook integration. It exposes connection diagnostics, automation-rule status, conversation controls, execution history and analytics.

It does not by itself connect an Instagram account, complete Meta App Review or guarantee that outbound replies can be sent. Those steps require external Meta configuration and production secrets.

## 1. Connection diagnostics

The Connection card reads the admin diagnostics endpoint and displays:

- Connection status.
- Instagram username or Meta account id.
- Graph API host and version.
- Whether the app secret, webhook verify token, access token and public Web base URL are configured.
- Cargo Reel media id.
- Required and granted permissions.
- Token reference / expiry metadata where available.

The diagnostics endpoint reports configuration state, not the secret/token value. Access tokens must remain in server environment configuration and must never be committed to Git.

## 2. Automation rules

The Rules section lists configured rules and shows:

- Rule name.
- Trigger type: Comment, DirectMessage or Postback.
- Match mode: Exact, Contains, AnyKeyword or AllKeywords.
- Media id (or any media).
- Flow key: Cargo, Housing or Jobs.
- Dry-run / Live state.
- Enabled / Disabled state.

The page exposes an Enable/Disable action. The API also supports rule creation, editing, preview and enable-state changes. Rule text and keywords are stored as data; changing them does not require a code deployment.

The default seeded rule is **Cargo Reel - Comment to DM**. It is disabled and in dry-run. Do not enable it until the Meta configuration and operational checklist are complete.

## 3. Conversations

The Conversations section lists Instagram user id, flow, conversation state and current automation/human assignment state. Operators can:

- **Pause** automation for the conversation.
- **Human** — assign the conversation to a human operator.
- **Resume** automation.

A direct message continues an existing conversation even when the new text does not match a new keyword rule. A new conversation starts only when a rule matches.

## 4. Executions

The Executions section shows recent automation actions and their status, including successful, failed and uncertain outcomes. It can display the failure reason or related comment id. An uncertain private-reply send is not automatically repeated if Meta may already have accepted it.

## 5. Analytics

The analytics API provides counts for:

- Comments received.
- Comments matched to a rule.
- Private replies sent.
- Incoming direct messages.
- Conversation starts.
- Traveler selections.
- Sender selections.
- Links delivered.
- Redirect link clicks.

The current Backoffice page surfaces primary tiles for Comments, Matched, Private replies and Link clicks.

**Attribution limit:** redirect clicks are counted. Registrations and listing creation are not attributed to Instagram yet.

## 6. Safety and activation checklist

Before enabling the seeded rule:

1. Configure the Meta App id, app secret, webhook verify token, system-user access token and Instagram professional account id on the server.
2. Confirm the granted permissions include instagram_basic, instagram_manage_comments and instagram_manage_messages.
3. Set the real public Web base URL and the actual Cargo Reel media id both in configuration and on the rule.
4. Complete the Meta webhook handshake and subscribe the required comment, message and postback events.
5. Confirm a tester comment is stored and produces a DryRun execution without sending a message.
6. Verify the account's messaging access, token and permissions.
7. Only after all external approvals and checks are complete, turn dry-run off and enable the rule.

Meta Business Verification, App Review and Advanced Access are manual external steps. The repository does not establish that they have been completed. See the detailed [Meta setup guide](../instagram-automation/META-SETUP.md) and [operations guide](../instagram-automation/OPERATIONS.md).

## Related documentation

- [Instagram automation architecture](../instagram-automation/ARCHITECTURE.md)
- [HTTP API](../instagram-automation/API.md)
- [Configuration](../instagram-automation/CONFIGURATION.md)
- [Meta setup](../instagram-automation/META-SETUP.md)
- [Operations](../instagram-automation/OPERATIONS.md)
- [Testing](../instagram-automation/TESTING.md)
- [November 13 GitLab audit](../releases/2026-11-13.md)
