"""empty message

Revision ID: 899f75f22487
Revises: ffdc0a98111c
Create Date: 2024-02-05 21:22:52.769775

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

# revision identifiers, used by Alembic.
revision = '899f75f22487'
down_revision = 'ffdc0a98111c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('profiles',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('is_EHS', sa.Boolean(), nullable=True),
    sa.Column('theme', sa.String(length=255), nullable=True),
    sa.Column('createdAt', sa.DateTime(), nullable=True),
    sa.Column('updatedAt', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    if environment == "production":
        op.execute(f"ALTER TABLE profiles SET SCHEMA {SCHEMA};")
    op.create_table('labs',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('profile_id', sa.Integer(), nullable=False),
    sa.Column('buildingNumber', sa.Integer(), nullable=True),
    sa.Column('roomNumber', sa.Integer(), nullable=True),
    sa.Column('createdAt', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['profile_id'], ['profiles.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    if environment == "production":
        op.execute(f"ALTER TABLE labs SET SCHEMA {SCHEMA};")
    op.create_table('vendors',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=35), nullable=False),
    sa.Column('contact_id', sa.Integer(), nullable=True),
    sa.Column('phoneNumber', sa.String(length=10), nullable=False),
    sa.Column('email', sa.String(length=35), nullable=False),
    sa.Column('createdAt', sa.DateTime(), nullable=True),
    sa.Column('updatedAt', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['contact_id'], ['profiles.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    if environment == "production":
        op.execute(f"ALTER TABLE vendors SET SCHEMA {SCHEMA};")
    op.create_table('barrels',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('lab_id', sa.Integer(), nullable=True),
    sa.Column('roomNumber', sa.Integer(), nullable=False),
    sa.Column('buildingNumber', sa.Integer(), nullable=False),
    sa.Column('profileNumber', sa.String(length=25), nullable=False),
    sa.Column('wasteType', sa.String(length=255), nullable=False),
    sa.Column('wasteCapacity', sa.Integer(), nullable=False),
    sa.Column('is_full', sa.Boolean(), nullable=True),
    sa.Column('createdAt', sa.DateTime(), nullable=True),
    sa.Column('updatedAt', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['lab_id'], ['labs.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    if environment == "production":
        op.execute(f"ALTER TABLE barrels SET SCHEMA {SCHEMA};")
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('barrels')
    op.drop_table('vendors')
    op.drop_table('labs')
    op.drop_table('profiles')
    # ### end Alembic commands ###