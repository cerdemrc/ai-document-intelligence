from pydantic import BaseModel, Field, field_validator

class ActionItem(BaseModel):
    task: str = Field(description="The action that needs to be completed.")
    responsible_person: str | None = Field(
        default=None,
        description="The person responsible, if specified in the document."
    )
    deadline: str | None = Field(
        default=None,
        description="The deadline, if specified in the document."
    )

    @field_validator("responsible_person", "deadline", mode="before")
    @classmethod
    def convert_null_strings(cls, value):
        if isinstance(value, str) and value.strip().lower() in {"null", "none", ""}:
            return None
        return value

    @field_validator("task", mode="before")
    @classmethod
    def validate_task(cls, value):
        if isinstance(value, str) and value.strip().lower() in {"null", "none", ""}:
            raise ValueError("Task cannot be empty or null.")
        return value

class DocumentAnalysis(BaseModel):
    summary: str = Field(description="A concise summary of the document.")
    key_points: list[str] = Field(
        description="The most important points in the document."
    )
    action_items: list[ActionItem] = Field(
        description="Tasks and actions identified in the document."
    )
    decisions: list[str] = Field(
        description="Decisions explicitly stated in the document."
    )