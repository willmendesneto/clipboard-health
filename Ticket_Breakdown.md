# Ticket Breakdown

We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**

Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".

You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

# 1 - Allow Facilities to input custom ID for Agents

> This ticket should be started before #3 in order to make sure it's not a blocker. However, this work can be started in parallel with ticket #2 since they're atomic taks

### About this ticket

Create a new field in the Agent table of the database to store custom IDs provided by Facilities.

Add a new field for custom ID in the Facility's dashboard to allow them to input their custom ID for each Agent they work with.

### Acceptance Criteria

Facilities are able to input custom IDs for each Agent they work with, and the custom IDs are validated against the Agent table in the database. Custom ID field is successfully added to the Agent table, and the API and database are updated to reflect the change.

### Time/effort estaimates

- 2 days

### Implementation details

> Any relevant documentation should be updated as part of this ticket

Database

- This new field should be unique, not null, and indexed.
- The custom ID should be allowed to contain alphanumeric characters, hyphens, and underscores.
- It should be mandatory for this operation

UI

- This new field should be validated against the Agent's custom ID field in the database to ensure uniqueness.
- The field should not accept falsy values as input.
- Error messages should follow internationalisation - AKA i18n - rules applied across app

---

# 2 - Display custom ID in reports

> This ticket should be started before #3 in order to make sure it's not a blocker. However, this work can be started in parallel with ticket #1 since they're atomic taks

### About this ticket

Modify the `generateReport` function to include the custom ID of each Agent in the report.

### Acceptance Criteria

the generateReport function now includes the custom ID field for each Agent in the report generated

### Time/effort estaimates

- 1 day

### Implementation details

- PDF template used to generate the report should be updated to include the custom ID field
- Data passed to the template should be modified to include the custom ID field for each Agent

---

# 3 - Allow Facilities to filter report by custom ID

> This story is blocked by #1 and #2 and should be started only when both tickets are delivered

### About this ticket

Modify the `getShiftsByFacility` function to allow Facilities to filter Shifts by custom ID

### Acceptance Criteria

- Facilities should be able to filter Shifts by custom ID

### Time/effort estaimates

- 2 days

### Implementation details

- Facilities should be able to filter Shifts by custom ID using the modified `getShiftsByFacility` function
- This would involve adding a new optional parameter to the function that would allow Facilities to specify a custom ID to filter by
- The function should return Shifts that match the custom ID provided, along with any other filters applied

UI

- UI Should cover required changes related to the feature. It covers UX for Facilities should be able to filter Shifts by custom ID using the modified `getShiftsByFacility` function
