"""empty message

Revision ID: 7ddf276c4ad2
Revises: 
Create Date: 2024-02-21 06:15:33.016732

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")


# revision identifiers, used by Alembic.
revision = '7ddf276c4ad2'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    if environment == "production":
        op.execute(f"ALTER TABLE users SET SCHEMA {SCHEMA};")

    op.create_table('profiles',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('is_EHS', sa.Boolean(), nullable=True),
    sa.Column('theme', sa.String(length=25), nullable=True),
    sa.Column('createdAt', sa.DateTime(), nullable=True),
    sa.Column('updatedAt', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('user_id')
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
    sa.Column('lab', sa.Integer(), nullable=False),
    sa.Column('profileNumber', sa.String(length=25), nullable=False),
    sa.Column('wasteType', sa.String(length=25), nullable=False),
    sa.Column('wasteCapacity', sa.Integer(), nullable=False),
    sa.Column('is_full', sa.Boolean(), nullable=True),
    sa.Column('createdAt', sa.DateTime(), nullable=True),
    sa.Column('updatedAt', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['lab'], ['labs.id'], ),
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
    op.drop_table('users')
    # ### end Alembic commands ###
