'use strict';

var AWS = require("aws-sdk");
const stepFunctions = new AWS.StepFunctions();

module.exports.hello = async event => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: event,
      },
      null,
      2
    ),
  };
}
module.exports.init = async event => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: event,
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

// module.exports.init = (event, context, callback) => {

//   const params = {
//     stateMachineArn = 'arn:aws:states:us-east-1:464362683477:execution:Helloworld:fa7842b4-d608-bb1c-dab7-b43482134074',
//     input: "",
//     name: "Execution lamdba"
//   }

//   // stepFunctions.startExecution(params, (err, data) => {
//   //   if(err){
//   //     console.log(err);
//   //     const response = {
//   //       statusCode: 500,
//   //       body: JSON.stringify(
//   //         message: "There was "
//   //       )
//   //     }
//   //   }
//   // })
//   const response  = {
//     statusCode: 200,
//     body: JSON.stringify(
//       {
//         message: "Hello World!",
//         input: event
//       }
//     )
//   };
//   callback(null, response)
// }

module.exports.triggerFunction = (event, context, callback) => {
  console.log("execute step function");
  const number = event.queryStringParameters.number;
  callStepFunction(number).then(
    () => {
      const res = {
        statusCode: 200,
        body: JSON.stringify(
          {
            message: 'Go Serverless v1.0! Your function executed successfully!',
            input: event,
          },
          null,
          2
        ),
      }
      callback(null, res);
    }
  )
}

const callStepFunction = (number) => {
  const stateMachineName = "Hellostepfunc1";
  return stepFunctions.listStateMachines({}).promise().then(
    listStateMachines =>{
      for(var i = 0; i < listStateMachines.stateMachines.length; i++){
        const item = listStateMachines.stateMachines[i];
        if(item.name.indexOf(stateMachineName) >= 0){
          var params = {
            stateMachineArn: item.stateMachineArn,
            input: JSON.stringify({
              number
            })
          }
          return stepFunctions.startExecution(params).promise().then(
            () => {
              return true;
            }
          )
        }
      }
    }
  ).catch(
    error => {
      return false;
    }
  )
}


// const simulateTimeout = event => {
//   // return 
//   setTimeout(handler)
//   {
//     statusCode: 200,
//     body: JSON.stringify(
//       {
//         message: 'Go Serverless v1.0! Your function executed successfully!',
//         input: event,
//       },
//       null,
//       2
//     ),
//   };
// }
