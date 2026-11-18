from pydantic import BaseModel, Field

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