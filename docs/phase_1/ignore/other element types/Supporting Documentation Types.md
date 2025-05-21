### 9. **Test**

- _Purpose:_ Unit, integration, or E2E test relevant to features, components, or APIs
    
- _Includes:_ Test purpose, triggers, expected outputs, linked functionality
    

---

### 10. **Contract**

- _Purpose:_ Formal interface or promise (e.g. API response contract, component prop spec)
    
- _Includes:_ Types, schema expectations, tolerance ranges, edge cases
    

---

### 11. **Intent**

- _Purpose:_ Internal app goal behind user/system actions (e.g. “complete_checkout”)
    
- _Includes:_ Associated events, state transitions, or observable flows
    

---

### 12. **Metric / Tracking**

- _Purpose:_ Analytics, success criteria, drop-off points
    
- _Includes:_ Event name, purpose, data collected, linked features/events/screens
    

---

### 13. **Static Check**

- _Purpose:_ Build-time checks or rules (e.g. lint rules, type assertions, architecture constraints)
    
- _Includes:_ What’s enforced and where, and what failure looks like
    

---

### 14. **Memory / Plan**

- _Purpose:_ Agent-based memory store or task plan history
    
- _Includes:_ Decisions made by LLM/agent, what it has previously attempted, success/failure
    

---

## **System Configuration**

### 15. **Route**

- _Purpose:_ Maps navigation flow between screens or tab structures
    
- _Includes:_ Stack, modal, tab logic, parameters passed
    

---

### 16. **Environment / Config**

- _Purpose:_ Variables or keys that affect behavior across environments
    
- _Includes:_ Dev vs prod config, API base URLs, feature flags, platform switches
    

---

### 17. **Dependency / Library**

- _Purpose:_ External packages or SDKs used
    
- _Includes:_ Why it’s used, versions, how it’s imported
    

---

## **Bonus Types (Optional if Needed)**

- **UserPersona**: Defines user roles, needs, flows
    
- **Flow**: Describes multi-step experiences across features (e.g. onboarding)
    
- **ReleaseNote**: Tracks shipped changes for each version
    
- **Issue**: Tracks known problems or bugs