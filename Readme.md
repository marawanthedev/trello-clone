# This will be overall guide of the app implementation


# Error Handling

we have two types of errors

sync -> anything related to data processing or component rendering lifecycle
async -> anything relate to api calls/ user event such as button click (covering those errors is important to avoid user confusion -> bad ux -> lose of customers -> loss of money(which we dont want right!))

- We are using 'react-error-boundary'
    why? because it allows us to overcome native error boundary drawbacks which is catching sync errors only, but with this package you can manually trigger the error boundary upon async errors using `showBoundary(error)`. and you have option to reset error state which is quite useful

how are we covering all types of errors?

- sync -> automatically caught by error boundary
- handled async -> async calls wrapped with try and catch can still trigger error boundary by passing showBoundary to the catch block
![alt text](image.png)
- unhandled async (user event related) -> user related events such as click is not automatically caught but we are listening to those error events and triggering error boundary as well
- unhandled  async (promise rejection related) -> failed api requests results in rejected promise are not not automatically caught but we are listening to those error events and triggering error boundary as well
![alt text](image-1.png)
