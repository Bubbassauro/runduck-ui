
export type ConfigurationInfo = {
    command?: string,
}

export type JobRefInfo = {
    group?: string,
    name?: string,
    project?: string,
    uuid?: string
}

export type CommandType = {
    description?: string,
    exec?: string,
    script?: string,
    jobref?: JobRefInfo,
    configuration?: ConfigurationInfo,
    nodeStep?: boolean,
    type?: string,
}

export type CommandProps = {
    command: CommandType
}

export type EmailType = {
    recipients?: string,
    subject?: string,
}

export type NotificationEmailProps = {
    email: EmailType,
    title: string,
}

export type NotificationType = {
    onfailure?: NotificationEmailProps,
    onsuccess?: NotificationEmailProps,
}
