"use client";

import { graphql } from "@/gql";

export const UserDetails = graphql(/* GraphQL */ `
  fragment UserDetails on User {
    id
    name
    email
    slugName
  }
`);

export const TrackDetails = graphql(/* GraphQL */ `
  fragment TrackDetails on Track {
    id
    name
    userId
    user {
      ...UserDetails
    }
  }
`);

export const PointDetails = graphql(/* GraphQL */ `
  fragment PointDetails on Point {
    id
    timestamp

    latitude
    longitude
    altitude
    accuracy
    heading
    speed
  }
`);

export const TrackWithPoint = graphql(/* GraphQL */ `
  fragment TrackWithPoint on Track {
    ...TrackDetails
    locations {
      ...PointDetails
    }
  }
`);

export const ToastDetails = graphql(/* GraphQL */ `
  fragment ToastDetails on Toast {
    text
    type
  }
`);

export const PaginationDetails = graphql(/* GraphQL */ `
  fragment PaginationDetails on Pagination {
    totalRecords
    currentLimit
    currentPage
    hasNextPage
  }
`);

export const GetSelfByName = graphql(/* GraphQL */ `
  query GetSelfByName($input: GetSelfByNameInput!) {
    getSelfByName(input: $input) {
      ...UserDetails
    }
  }
`);

export const GetUserByName = graphql(/* GraphQL */ `
  query GetUserByName($input: GetUserByNameInput!) {
    getUserByName(input: $input) {
      ...UserDetails
    }
  }
`);

export const GetTracks = graphql(/* GraphQL */ `
  query GetTracks($input: GetTracksInput!) {
    getTracks(input: $input) {
      items {
        ...TrackWithPoint
      }
      pagination {
        ...PaginationDetails
      }
    }
  }
`);

export const CreateTrack = graphql(/* GraphQL */ `
  mutation CreateTrack($input: CreateTrackInput!) {
    createTrack(input: $input) {
      ...TrackWithPoint
    }
  }
`);
