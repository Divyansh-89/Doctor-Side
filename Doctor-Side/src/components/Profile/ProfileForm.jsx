import React from "react";
import ProfileAvatarEdit from "./ProfileAvatarEdit";

export default function ProfileForm({
  name,
  phone,
  email,
  avatarUrl, onAvatarChange, onRemoveAvatar, handleImgError,
  isUnchanged, isSaving, handleSubmit
}) {
  return (
    <form className="profile-edit-form" onSubmit={handleSubmit}>
      <ProfileAvatarEdit
        avatarUrl={avatarUrl}
        onAvatarChange={onAvatarChange}
        onRemoveAvatar={onRemoveAvatar}
        handleImgError={handleImgError}
      />

      <label htmlFor="name">
        Name
        <input
          id="name"
          type="text"
          value={name}
          readOnly
          disabled
          aria-label="Name (read-only)"
        />
      </label>
      <label htmlFor="phone">
        Phone Number
        <input
          id="phone"
          type="tel"
          value={phone}
          readOnly
          disabled
          aria-label="Phone number (read-only)"
        />
      </label>
      <label htmlFor="email">
        Email
        <input
          id="email"
          type="email"
          value={email}
          readOnly
          disabled
          aria-label="Email address (read-only)"
        />
      </label>
      <button type="submit" disabled={isUnchanged || isSaving}>
        {isSaving ? "Saving..." : "Save Photo"}
      </button>
    </form>
  );
}
