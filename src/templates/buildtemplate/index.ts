export const BuildResultTemplate = (status: string) => {
  const isSuccess = status === "success";

  const title = isSuccess ? "Build Succeeded" : "Build Failed";
  const titleColor = isSuccess ? "#4caf50" : "#f44336";
  const buttonBgColor = isSuccess ? "#4caf50" : "#f44336";
  const buttonText = isSuccess ? "Access Documentation" : "Review Logs";
  const message = isSuccess
    ? `Congratulations! Your build has completed successfully. Everything is good to go!`
    : `Unfortunately, your build has failed. Please review the details below and take necessary actions to resolve the issue.`;

  const nextSteps = isSuccess
    ? [
        "Deploy your changes to the production environment.",
        "Share your successful build with the team.",
        "Monitor the production environment for any issues.",
      ]
    : [
        "Check the build logs for errors.",
        "Resolve any issues with dependencies or configurations.",
        "Retry the build process after resolving the errors.",
      ];

  return `
  <div style="background:#f8fafc;padding:40px 20px;font-family:'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
    <div style="max-width:600px;margin:0 auto;background:#ffffff;padding:48px;border-radius:8px;box-shadow:0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.06);border:1px solid #e2e8f0;">
  
      <h1 style="text-align:center;color:${titleColor};font-size:24px;font-weight:600;margin:0 0 16px 0;">${title}</h1>
      <p style="font-size:15px;color:#475569;line-height:1.5;margin:0 0 24px 0;text-align:center;">
        ${message}
      </p>
      
      <div style="background:#f1f5f9;border-radius:6px;padding:24px;margin:32px 0;">
        <h3 style="color:#334155;font-size:16px;font-weight:600;margin:0 0 16px 0;">${
          isSuccess ? "What to do Next" : "Build Failure Details"
        }</h3>
        <ul style="padding-left:20px;color:#475569;font-size:15px;margin:0;line-height:1.6;">
          ${nextSteps
            .map((step) => `<li style="margin-bottom:8px;">${step}</li>`)
            .join("")}
        </ul>
      </div>
  
      <div style="text-align:center;margin:32px 0;">
        <a href="https://github.com/your-org/gitcruse/docs" style="display:inline-block;background:${buttonBgColor};color:#ffffff;padding:12px 24px;text-decoration:none;border-radius:6px;font-weight:500;font-size:15px;transition:background-color 0.2s;">${buttonText}</a>
      </div>
  
      <div style="text-align:center;margin-top:32px;font-size:13px;color:#94a3b8;border-top:1px solid #e2e8f0;padding-top:24px;">
        <p style="margin:4px 0;">GitCruse Development Team</p>
        <p style="margin:4px 0;">© 2023 GitCruse. All rights reserved.</p>
        <p style="margin:8px 0 0 0;">
          <a href="#" style="color:${buttonBgColor};text-decoration:none;margin:0 8px;">Website</a>
          <a href="#" style="color:${buttonBgColor};text-decoration:none;margin:0 8px;">Support</a>
          <a href="#" style="color:${buttonBgColor};text-decoration:none;margin:0 8px;">Unsubscribe</a>
        </p>
      </div>
    </div>
  </div>
  `;
};
