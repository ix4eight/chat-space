# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|text|
|body|text|
|groups_users_id|integer|null: false, foreign_key: true|
|message_id|integer|null: false, foreign_key: true|
## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|text|
|address|string|
|password|text|
|groups_users_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text|
|image|string|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user
- belongs_to :message