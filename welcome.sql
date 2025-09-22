-- Tabla Membership
CREATE TABLE membership (
    id SERIAL PRIMARY KEY,
    type VARCHAR(255) NOT NULL
);

-- Tabla User
CREATE TABLE "user" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    membershipId INT,
    email VARCHAR(255) UNIQUE NOT NULL,
    emailVerified BOOLEAN DEFAULT FALSE,
    image VARCHAR(255),
    createAt DATE DEFAULT CURRENT_DATE,
    updateAt DATE,
    CONSTRAINT fk_user_membership FOREIGN KEY (membershipId) REFERENCES membership(id)
);

-- Tabla Session
CREATE TABLE session (
    id VARCHAR(255) PRIMARY KEY,
    userId INT NOT NULL,
    token VARCHAR(255) NOT NULL,
    expireAt DATE NOT NULL,
    ipAddress VARCHAR(255),
    userAgent VARCHAR(255),
    createAt DATE DEFAULT CURRENT_DATE,
    updateAt DATE,
    CONSTRAINT fk_session_user FOREIGN KEY (userId) REFERENCES "user"(id)
);

-- Tabla Account
CREATE TABLE account (
    id VARCHAR(255) PRIMARY KEY,
    userId INT NOT NULL,
    accountId VARCHAR(255),
    providerId VARCHAR(255),
    accessToken VARCHAR(255),
    refreshToken VARCHAR(255),
    accessTokenExpireAt DATE,
    refreshTokenExpireAt DATE,
    scope VARCHAR(255),
    idToken VARCHAR(255),
    CONSTRAINT fk_account_user FOREIGN KEY (userId) REFERENCES "user"(id)
);

-- Tabla Verification
CREATE TABLE verification (
    id VARCHAR(255) PRIMARY KEY,
    identifier VARCHAR(255) NOT NULL,
    value VARCHAR(255) NOT NULL,
    expireAt DATE NOT NULL,
    createAt DATE DEFAULT CURRENT_DATE,
    updateAt DATE
);

-- Tabla Logs
CREATE TABLE logs (
    id BIGSERIAL PRIMARY KEY,
    userId INT NOT NULL,
    senderEmail VARCHAR(255),
    state VARCHAR(255),
    category VARCHAR(255),
    subject VARCHAR(255),
    createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_logs_user FOREIGN KEY (userId) REFERENCES "user"(id)
);

-- Tabla Setting
CREATE TABLE setting (
    id BIGSERIAL PRIMARY KEY,
    userId INT NOT NULL,
    language VARCHAR(50),
    dailyNotification BOOLEAN DEFAULT FALSE,
    alerts BOOLEAN DEFAULT FALSE,
    CONSTRAINT fk_setting_user FOREIGN KEY (userId) REFERENCES "user"(id)
);