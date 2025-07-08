import React from "react";

export default function LeaveSummary({ balance }) {
  return (
    <div className="leave-summary">
      <span>
        Annual Leave: <strong>{balance.annual}</strong>
      </span>
      <span>
        Sick Leave: <strong>{balance.sick}</strong>
      </span>
      <span>
        Casual Leave: <strong>{balance.casual}</strong>
      </span>
    </div>
  );
}
