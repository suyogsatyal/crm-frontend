export enum Permission {
    // Auth
    AUTH_LOGIN = "auth.login",
    AUTH_ME = "auth.me",
    AUTH_REFRESH = "auth.refresh",

    // Role & Permission Management
    ROLE_CREATE = "role.create",
    ROLE_VIEW = "role.read",
    ROLE_VIEW_ALL = "role.view.all",
    ROLE_UPDATE = "role.update",
    ROLE_DELETE = "role.delete",
    PERMISSION_MANAGE = "permission.manage",

    // User Management
    USER_CREATE = "user.create",
    USER_READ = "user.read",
    USER_UPDATE = "user.update",
    USER_DELETE = "user.delete",
    USER_ASSIGN_ROLE = "user.assign.role",
    USER_PASSWORD_UPDATE = "user.password.update",
    USER_VIEW = "user.view",
    USER_VIEW_ALL = "user.view.all",

    // Lead Management
    LEAD_CREATE = "lead.create",
    LEAD_READ = "lead.read",
    LEAD_UPDATE = "lead.update",
    LEAD_DELETE = "lead.delete",
    LEAD_ASSIGN = "lead.assign",
    LEAD_STATUS_CHANGE = "lead.status.change",
    LEAD_CONVERT_TO_STUDENT = "lead.convert",

    // Service Management
    SERVICE_CREATE = "service.create",
    SERVICE_READ = "service.read",
    SERVICE_ALL = "service.all", // Get all services including inactive
    SERVICE_UPDATE = "service.update",
    SERVICE_DELETE = "service.delete",

    // Document Management
    DOCUMENT_CREATE = "document.create",
    DOCUMENT_READ = "document.read",
    DOCUMENT_UPDATE = "document.update",
    DOCUMENT_DELETE = "document.delete",

    // Workflow Management
    WORKFLOW_CREATE = "workflow.create",
    WORKFLOW_READ = "workflow.read",
    WORKFLOW_UPDATE = "workflow.update",
    WORKFLOW_DELETE = "workflow.delete",
    WORKFLOW_VIEW_ALL = "workflow.view.all",
    WORKFLOW_COPY = "workflow.copy",
    WORKFLOW_EDIT = "workflow.edit",
    WORKFLOW_ACTIVATE = "workflow.activate",
    WORKFLOW_DEACTIVATE = "workflow.deactivate",

    // Workflow Stage Management
    WORKFLOW_STAGE_CREATE = "workflow.stage.create",
    WORKFLOW_STAGE_READ = "workflow.stage.read",
    WORKFLOW_STAGE_UPDATE = "workflow.stage.update",
    WORKFLOW_STAGE_DELETE = "workflow.stage.delete",

    // Workflow Stage Document Management
    WORKFLOW_STAGE_DOCUMENT_CREATE = "workflow.stage.document.create",
    WORKFLOW_STAGE_DOCUMENT_READ = "workflow.stage.document.read",
    WORKFLOW_STAGE_DOCUMENT_UPDATE = "workflow.stage.document.update",
    WORKFLOW_STAGE_DOCUMENT_DELETE = "workflow.stage.document.delete",

    // Workflow Stage Fact Management
    WORKFLOW_STAGE_FACT_CREATE = "workflow.stage.fact.create",
    WORKFLOW_STAGE_FACT_READ = "workflow.stage.fact.read",
    WORKFLOW_STAGE_FACT_UPDATE = "workflow.stage.fact.update",
    WORKFLOW_STAGE_FACT_DELETE = "workflow.stage.fact.delete",

    // Application Management
    APPLICATION_CREATE = "application.create",
    APPLICATION_READ = "application.read",
    APPLICATION_UPDATE = "application.update",
    APPLICATION_DELETE = "application.delete",
    APPLICATION_MOVE_STAGE = "application.move.stage",
    APPLICATION_VIEW_ALL = "application.view.all",
    APPLICATION_VIEW = "application.view",

    // Student Management (Future)
    STUDENT_CREATE = "student.create",
    STUDENT_READ = "student.read",
    STUDENT_UPDATE = "student.update",

    // Finance (Future)
    INVOICE_CREATE = "invoice.create",
    INVOICE_READ = "invoice.read",
    PAYMENT_RECORD = "payment.record",

    // System
    SYSTEM_VIEW_LOGS = "system.view.logs",
    SYSTEM_SETTINGS = "system.settings",

    // Superadmin Only
    SUPERADMIN = "superadmin", // God mode
}
